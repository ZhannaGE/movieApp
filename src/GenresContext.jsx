import { createContext, useState, useEffect, useCallback } from 'react';
import API_KEY from './config.js';

const GenresContext = createContext();

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGenres = useCallback(async () => {
    try {
      const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US';
      const headers = {
        Authorization: API_KEY,
      };

      const response = await fetch(url, { method: 'GET', headers });
      const data = await response.json();
      const genresData = data.genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});

      setGenres(genresData);
    } catch (err) {
      setError('Ошибка при загрузке жанров.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  return <GenresContext.Provider value={{ genres, loading, error }}>{children}</GenresContext.Provider>;
};

export default GenresContext;
