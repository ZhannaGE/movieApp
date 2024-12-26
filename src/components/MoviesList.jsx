import { Alert } from 'antd';
import MovieCard from './MovieCard';

import { useContext } from 'react';
import GenresContext from '../GenresContext.jsx';

const MoviesList = ({ movies, error, onRate, ratings }) => {
  const { genres, error: genresError } = useContext(GenresContext);

  // Функция для получения названий жанров по их ID
  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => genres[id] || 'Unknown').join(', ');
  };

  if (error || genresError) {
    return (
      <div>
        <Alert message="Ошибка" description={error || genresError} type="error" showIcon />
      </div>
    );
  }

  return (
    <div>
      <ul className="movie-list">
        {}
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            getGenreNames={getGenreNames}
            onRate={onRate}
            ratings={ratings[movie.id] || 0}
          />
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
