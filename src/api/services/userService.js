import api from '../axiosInstance';
import handleRequest from '../requestHelper';

const userService = {
  authenticateAdmin: (data) => handleRequest(() => api.post('/auth/login', data)),


  getAllUsers: () => handleRequest(() => api.get('/users')),
  getUserById: (id) => handleRequest(() => api.get(`/users/${id}`)),
  createUser: (data) => handleRequest(() => api.post('/users', data)),
  updateUser: (id, data) => handleRequest(() => api.put(`/users/${id}`, data)),
  deleteUser: (id) => handleRequest(() => api.delete(`/users/${id}`)),
};

export default userService;
