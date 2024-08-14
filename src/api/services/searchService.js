import api from '../axiosInstance';
import handleRequest from '../requestHelper';

const searchService = {
  getGlobalSearch: (stringSearch) => handleRequest(() => api.get(`/filter-search?search=${stringSearch}`)),
  getAllPhotos: () => handleRequest(() => api.get('/albums')),

};

export default searchService;
