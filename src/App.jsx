import './App.css';

import { useState, useEffect } from 'react';
import { Tabs, Alert } from 'antd';
import MoviesList from '../src/components/MoviesList.jsx';
import MovieSearch from '../src/components/MovieSearch.jsx';
import PaginationComponent from '../src/components/PaginationComponent.jsx';
import MyLoader from './components/MyLoader.jsx';
import API_KEY from './config.js';
import { GenresProvider } from './GenresContext.jsx';
import { Button, Result } from 'antd';

const App = () => {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState('');
  const [ratings, setRatings] = useState({});
  const [activeTab, setActiveTab] = useState('search');

  //для сохранения рейтинга использую localStorage
  useEffect(() => {
    const storedRatings = localStorage.getItem('movieRatings');
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings)); // Загружаем сохраненные рейтинги
    }
  }, []);

  useEffect(() => {
    if (Object.keys(ratings).length > 0) {
      localStorage.setItem('movieRatings', JSON.stringify(ratings)); // Сохраняем рейтинги
    }
  }, [ratings]);

  //обновляет состояние, которое хранит рейтинги фильмов
  const handleRate = (movieId, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: value, // Обновляем или добавляем рейтинг для конкретного фильма
    }));
  };

  //получаем данные о фильмах
  const fetchMovies = async (searchQuery, page) => {
    setLoading(true); // Показываем скелетон, как только запрос начнется
    setError(null); // Сбрасывает возможные ошибки

    //формируем запрос
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&include_adult=false&language=en-US&page=${page}`
      : `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

    const headers = { Authorization: API_KEY };

    try {
      //отсылаем запрос
      const response = await fetch(url, { method: 'GET', headers });
      const data = await response.json();
      if (response.ok) {
        // Если ответ успешный, обновляем состояние
        setCurrentMovies(data.results || []); //список фильмов
        setTotalResults(data.total_results || 0); //общее кол фильмов
      } else {
        throw new Error(data.status_message || 'Ошибка при загрузке данных');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Прячем индикатор загрузки после завершения запроса
    }
  };

  // Запускаем запрос сразу после монтирования компонента
  useEffect(() => {
    fetchMovies(query, currentPage);
  }, [query, currentPage]); //Хук useEffect будет выполняться каждый раз, когда изменится одно из этих значений

  const ratedMovies = currentMovies.filter((movie) => ratings[movie.id]); //формируем новый массив фильмов, у которых есть оценка

  //очищаем инпут по клику на кнопку
  const handleBackHome = () => {
    setQuery('');
    setCurrentPage(1);
  };

  //формируем две вкладки
  const tabItems = [
    {
      key: 'search',
      label: 'Search',
      children: (
        <>
          <MovieSearch query={query} setQuery={setQuery} setCurrentPage={setCurrentPage} error={error} />
          {loading ? (
            <div>
              <MyLoader />
              <MyLoader />
              <MyLoader />
              <MyLoader />
            </div>
          ) : (
            <MoviesList movies={currentMovies} loading={loading} error={error} onRate={handleRate} ratings={ratings} />
          )}
          {error && <Alert message={error} type="error" />}
          {totalResults > 0 && !loading && (
            <PaginationComponent
              currentPage={currentPage}
              totalResults={totalResults}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
          {totalResults === 0 && !loading && (
            <Result
              status="404"
              subTitle="Sorry, your film not found."
              extra={
                <Button type="primary" onClick={handleBackHome}>
                  Back Home
                </Button>
              }
            />
          )}
        </>
      ),
    },
    {
      key: 'rated',
      label: 'Rated',
      children: (
        <>
          {ratedMovies.length === 0 ? (
            <Result status="404" subTitle="Sorry, rating film not found." />
          ) : (
            <MoviesList movies={ratedMovies} loading={loading} error={error} onRate={handleRate} ratings={ratings} />
          )}
        </>
      ),
    },
  ];

  return (
    <GenresProvider>
      <div>
        <div className="fixed-tabs">
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        </div>
      </div>
    </GenresProvider>
  );
};

export default App;
