import axios from 'axios';
import api from './axiosInstance';
import userService from './services/userService';

// console.log("start");

// Перехватчик запросов
api.interceptors.request.use(
    config => {

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        console.log("Request interceptor: tokens set");

        if (accessToken) {
            config.headers['Authorization'] = `${accessToken}`;
        }
        if (refreshToken) {
            config.headers['x-refresh-token'] = refreshToken;
        }


        console.log("Request interceptor: config", config);
        return config;
       
    },
    error => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);


//         const accessToken = localStorage.getItem('accessToken');
//         const refreshToken = localStorage.getItem('refreshToken');
//         console.log("Request interceptor: tokens set");

//         if (accessToken) {
//             config.headers['Authorization'] = `Bearer ${accessToken}`;
//         }
//         if (refreshToken) {
//             config.headers['x-refresh-token'] = refreshToken;
//         }


//         console.log("Request interceptor: config", config);
//         return config;
       
//     }
//     , function (error) {
//         console.error("Request interceptor error:", error);
//         return Promise.reject(error);
//     }
// );


// Перехватчик ответов
api.interceptors.response.use(
    response => {
        console.log("Response interceptor: response received");
        return response;
    },
    error => {
        console.error("Response interceptor error:", error);
        if (error.response && error.response.status === 401) {
          console.warn("Unauthorized access - redirecting to login");
          window.location.href = '/';
        }
        return Promise.reject(error);
    }
);



export default api;
