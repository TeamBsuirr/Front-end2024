import api from "./axiosInstance";
import { logout } from "../utils/tokenService";
import { notification } from "antd";

// Перехватчик запросов
api.interceptors.request.use(
    (config) => {
        if (typeof config.data === "string") {
            config.data = JSON.parse(config.data);
        }

        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    },
);

// Перехватчик ответов
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Communicate refresh failed:", refreshError);
                logout();
                notification.warning({
                    message: "Session Expired",
                    description:
                        "Your session has expired. You have been logged out.",
                });
                window.location.href = "/"; // Перенаправление на главную страницу
            }
        }

        return Promise.reject(error);
    },
);

export default api;
