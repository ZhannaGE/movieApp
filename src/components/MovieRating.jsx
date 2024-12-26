import { Rate } from 'antd';
import PropTypes from 'prop-types';

const MovieRating = ({ movieId, initialRating = 0, onRate }) => {
  const handleRateChange = (value) => {
    onRate(movieId, value); // Передаем рейтинг наверх
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <Rate value={initialRating} onChange={handleRateChange} />
    </div>
  );
};

MovieRating.propTypes = {
  movieId: PropTypes.number.isRequired,
  ratings: PropTypes.number, // Используем переданный рейтинг
  onRate: PropTypes.func.isRequired, // Функция для передачи нового рейтинга
};

export default MovieRating;
