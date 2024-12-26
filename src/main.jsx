import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Импорт основного компонента
import './index.css'; // Стили приложения

// Рендерим компонент App в корневой элемент
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
