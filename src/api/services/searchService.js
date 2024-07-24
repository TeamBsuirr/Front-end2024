import handleRequest from '../requestHelper';

const searchService = {
  getAllUsers: () => handleRequest(() => api.get('/users')),
  getUserById: (id) => handleRequest(() => api.get(`/users/${id}`)),
  createUser: (data) => handleRequest(() => api.post('/users', data)),
  updateUser: (id, data) => handleRequest(() => api.put(`/users/${id}`, data)),
  deleteUser: (id) => handleRequest(() => api.delete(`/users/${id}`)),
};

export default searchService;
