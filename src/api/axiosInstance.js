import axios from "axios";
// Создаем экземпляр Axios с базовой конфигурацией
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL_ADMIN || "http://localhost:baka",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
