import api from "../api/axiosInstance";

export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh-token', {
      refreshToken: localStorage.getItem('refreshToken')
    });
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error('Failed to refresh token', error);
    logout(); // Если обновление токена не удалось, выполняем логаут
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/:lang/login'; // Перенаправляем на страницу логина
};

// Механизм для регулярного обновления токенов
export const scheduleTokenRefresh = () => {
    const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 минут
    setInterval(async () => {
      try {
        await refreshToken();
        console.log('Token refreshed successfully');
      } catch (error) {
        console.error('Failed to refresh token automatically:', error);
        logout();
      }
    }, REFRESH_INTERVAL);
  };