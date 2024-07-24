import axios from 'axios';

// Создаем экземпляр Axios с базовой конфигурацией
const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

