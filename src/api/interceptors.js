import api from "./axiosInstance";
import { logout, refreshToken } from "../utils/tokenService";
import { notification } from "antd";

// console.log("start");

// Перехватчик запросов
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (config.url !== "/auth/login" && accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

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
        //console.log("Response interceptor: response received");
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            // Проверяем, что запрос не касается обновления токена
            if (originalRequest.url.includes("/auth/refresh-token")) {
                console.error("Refresh token request failed. Logging out.");
                logout();
                notification.warning({
                    message: "Session Expired",
                    description:
                        "Your session has expired. You have been logged out.",
                });

                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshToken();
                api.defaults.headers.common["Authorization"] =
                    `Bearer ${newAccessToken}`;
                originalRequest.headers["Authorization"] =
                    `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
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
