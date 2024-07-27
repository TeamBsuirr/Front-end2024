import api from '../axiosInstance';
import handleRequest from '../requestHelper';

const userService = {
  authenticateAdmin: (data) => handleRequest(() => api.post('/auth/login', data)),
  postStory: (data) => {
    // Сериализуем данные в JSON
    const jsonData = JSON.stringify(data);
    
    // Логируем данные перед отправкой
    console.log("Posting story with data:", jsonData);
    
    // Выполняем запрос, добавляя заголовок Content-Type
    return handleRequest(() => api.post('/applications', {jsonData}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }));
  },
  getAllUsers: () => handleRequest(() => api.get('/users')),
  getUserById: (id) => handleRequest(() => api.get(`/users/${id}`)),
  createUser: (data) => handleRequest(() => api.post('/users', data)),
  updateUser: (id, data) => handleRequest(() => api.put(`/users/${id}`, data)),
  deleteUser: (id) => handleRequest(() => api.delete(`/users/${id}`)),
};

export default userService;
