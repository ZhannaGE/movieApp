import { Pagination } from 'antd';
import PropTypes from 'prop-types';

const PaginationComponent = ({ currentPage, totalResults, onPageChange, query }) => {
  const handleChange = (page) => {
    onPageChange(page, query); // Обновляем текущую страницу в `App`
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Pagination
        current={currentPage}
        total={totalResults}
        pageSize={20} // Количество фильмов на странице (зависит от API)
        onChange={handleChange}
        showSizeChanger={false} // Отключаем изменение размера страниц
      />
    </div>
  );
};

PaginationComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationComponent;
