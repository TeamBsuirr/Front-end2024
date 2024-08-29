import axios from 'axios';
import api from './axiosInstance';
import userService from './services/userService';
import { logout, refreshToken } from '../utils/tokenService';

// console.log("start");

// Перехватчик запросов
api.interceptors.request.use(
    config => {

        let headers = new Headers();

        if (config.url === '/auth/login') {
            // Если запрос на /auth/login, не добавляем токены
            console.log("Request interceptor: login request detected, not adding tokens.");
            return config;
        }

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');


        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            console.log("Request interceptor: tokens set (Authorization)");
        }
        if (refreshToken) {
            // config.headers['x-refresh-token'] = refreshToken;
            config.headers['x-refresh-token'] = `Bearer ${accessToken}`;
            console.log("Request interceptor: tokens set (x)");
        }

        console.log(config)
        if (typeof config.data === "string") {
            config.data = JSON.parse(config.data);
        } else {
            console.log(typeof(config.data))
        }


        // config.headers['Access-Control-Allow-Origin'] = `http://localhost:3000`;
        // config.headers['Access-Control-Allow-Methods'] = `POST, GET, PUT, DELETE`;
        // config.headers['Access-Control-Allow-Headers'] = `Content-Type, Authorization`;
        // headers.append('Access-Control-Allow-Origin',`http://localhost:3000`);
        // headers.append('Access-Control-Allow-Methods',`POST, GET, PUT, DELETE`);
        // headers.append('Access-Control-Allow-Headers', `Content-Type, Authorization`);
        console.log("Request interceptor: config", config);
        return config;

    },
    error => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);


// Перехватчик ответов
api.interceptors.response.use(
    response => {
        console.log("Response interceptor: response received");
        return response;
    },
    // error => {
    //     console.error("Response interceptor error:", error);
    //     if (error.response && error.response.status === 401) {
    //         console.warn("Unauthorized access - redirecting to login");
    //         //window.location.href = '/';
    //     }
    //     return Promise.reject(error);
    // }
    async error => {
        console.error("Response interceptor error:", error);

        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.warn("Unauthorized access detected - attempting to refresh token");

            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshToken();
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                logout();  // Выход из системы, если обновление токена не удалось
            }
        }

        return Promise.reject(error);
    }
);



export default api;
