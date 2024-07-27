import api from '../axiosInstance';
import handleRequest from '../requestHelper';

const searchService = {
  getGlobalSearch: (stringSearch) => handleRequest(() => api.get(`/filter-search?search=${stringSearch}`)),
  getAllPhotos: () => handleRequest(() => api.get('/albums')),

//   getGlobalSearch: (searchText) => handleRequest(async () => {
//     const response = await api.get(`/filter-search?searchText=${searchText}`);
//     console.log(response)
//     return response;
// }),
};

export default searchService;
