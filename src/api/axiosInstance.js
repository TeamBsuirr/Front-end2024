import axios from 'axios';

console.log("temporal test of secret vars: (process.env)=",process.env)

// Создаем экземпляр Axios с базовой конфигурацией
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:baka',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

