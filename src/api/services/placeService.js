import api from '../axiosInstance';
import handleRequest from '../requestHelper';

const placeService = {

  getPlaceById: (id) => handleRequest(() => api.get(`/places/${id}`)),

  // getAllUsers: () => handleRequest(() => api.get('/users')),
  // getUserById: (id) => handleRequest(() => api.get(`/users/${id}`)),
  // createUser: (data) => handleRequest(() => api.post('/users', data)),
  // updateUser: (id, data) => handleRequest(() => api.put(`/users/${id}`, data)),
  // deleteUser: (id) => handleRequest(() => api.delete(`/users/${id}`)),
};

export default placeService;
