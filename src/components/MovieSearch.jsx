import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
import { Input } from 'antd';

const MovieSearch = ({ query, setQuery, setCurrentPage, error }) => {
  const [localQuery, setLocalQuery] = useState(query); // Локальное состояние для немедленного отображения

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      setQuery(searchValue);
      setCurrentPage(1); // Сбрасываем текущую страницу при изменении поиска
    }, 1000),
    [setQuery, setCurrentPage]
  );

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setLocalQuery(newQuery); // Немедленно обновляем локальное состояние
    debouncedSearch(newQuery); // Обновляем глобальное состояние с задержкой
  };

  useEffect(() => {
    setLocalQuery(query); // Синхронизируем локальное состояние с глобальным
  }, [query]);

  return (
    <div style={{ padding: '20px' }}>
      <Input
        id="search-input"
        placeholder="Search films..."
        value={localQuery} // Используем локальное состояние
        onChange={handleInputChange}
        style={{ width: '100%', marginBottom: '20px' }}
      />
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

MovieSearch.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default MovieSearch;
