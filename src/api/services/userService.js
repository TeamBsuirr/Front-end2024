import api from '../axiosInstance';
import handleRequest from '../requestHelper';

const userService = {
  authenticateAdmin: (data) => handleRequest(() => api.post('/auth/login', data)),

  postStory: (data) => {
    // Сериализуем данные в FormData MIME
    const transformedData = new FormData()
    // Логируем данные перед отправкой
    //console.log("Posting story with transformedData:", data);

    transformedData.append('name', data.name)
    transformedData.append('surname', data.surname)
    transformedData.append('patronymic', data.patronymic)
    transformedData.append('dateOfBirth', data.dateOfBirth)
    transformedData.append('dateOfDie', data.dateOfDie)
    transformedData.append('placeOfBirth', data.placeOfBirth)
    transformedData.append('placeOfDetention', data.placeOfDetention)
    transformedData.append('dateFrom', data.dateFrom)
    transformedData.append('dateTo', data.dateTo)
    transformedData.append('fio', data.fio)
    transformedData.append('phoneNumber', data.phoneNumber)
    transformedData.append('email', data.email)
    transformedData.append('history', data.history)
    data.files.forEach((file) => {
      transformedData.append('files', file);
    });

    // Логируем данные перед отправкой
    //console.log("Posting story with transformedData:", transformedData);

    // Выполняем запрос, добавляя заголовок Content-Type
    return handleRequest(() => api.post('/applications', transformedData, {
      headers: {
        'Content-Type': 'multipart/form-data'
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
