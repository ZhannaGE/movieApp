import PropTypes from 'prop-types';
import { Card } from 'antd';
import { format } from 'date-fns';
import MovieRating from './MovieRating';
import moviImage from '../../src/assets/movi.png';

const { Meta } = Card;

const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text || 'No description available';
  }
  const truncated = text.slice(0, maxLength).trim();
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '...';
};

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown release date';
  try {
    return format(new Date(dateString), 'd MMMM yyyy');
  } catch (error) {
    console.error('Invalid date format:', dateString);
    return 'Invalid date';
  }
};

const MovieCard = ({ movie, getGenreNames, onRate, ratings }) => {
  const maxLength = 100;

  const formatTitle = (title) => {
    if (!title) return 'No title available';

    const words = title.split(' '); // Разбиваем название на слова
    if (words.length > 4) {
      return (
        <>
          {words.slice(0, 4).join(' ')} <br /> {words.slice(4).join(' ')}
        </>
      );
    }
    return title; // Если слов меньше или равно 4, возвращаем исходное название
  };

  // Функция для получения цвета в зависимости от рейтинга
  const getRatingColor = (rating) => {
    if (rating <= 3) return '#E90000'; // Красный
    if (rating <= 5) return '#E97E00'; // Оранжевый
    if (rating <= 7) return '#E9D100'; // Желтый
    return '#66E900'; // Зеленый
  };

  const currentRating = movie.vote_average || 0; // Текущий рейтинг

  return (
    <li className="movie-card" key={movie.id}>
      <Card
        hoverable
        style={{ display: 'flex', alignItems: 'center', width: '450px', position: 'relative' }}
        cover={
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : moviImage}
            alt={movie.title || 'Placeholder'}
            style={{ width: '200px', height: '300px' }}
          />
        }
      >
        <div style={{ flex: 1, paddingLeft: '16px' }}>
          <Meta
            title={formatTitle(movie.title)}
            description={
              <>
                <p>{getGenreNames(movie.genre_ids) || 'Unknown genres'}</p>
                <p>{formatDate(movie.release_date)}</p>
                <p>{truncateText(movie.overview, maxLength)}</p>
              </>
            }
          />
        </div>

        {/* Блок с рейтингом в правом верхнем углу */}
        <div className="card-rating" style={{ backgroundColor: getRatingColor(currentRating) }}>
          {currentRating.toFixed(1)} {/* Показываем рейтинг с 1 знаков после запятой */}
        </div>

        <MovieRating movieId={movie.id} onRate={onRate} initialRating={ratings || 0} />
      </Card>
    </li>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    userRating: PropTypes.number, // Рейтинг пользователя
  }).isRequired,
  getGenreNames: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired,
  ratings: PropTypes.number.isRequired,
};

export default MovieCard;
