import api from '../axiosInstance';
import handleRequest from '../requestHelper';

const searchService = {
  getGlobalSearch: (stringSearch) => handleRequest(() => api.get(`/filter-search?search=${stringSearch}`)),
  getAllPhotos: () => handleRequest(() => api.get('/albums')),
  deletePhotoById: (id) =>  handleRequest(() => api.delete(`/albums/${id}`)),
  getPhotoByIdForPostPhoto: (id) => handleRequest(async () => {
    const response = await api.get(`/albums/${id}`)
    return { data: transformResponseAPhotoForMapForPostPhoto(response.data) };
  },),
  postPhoto: (data) => {
    // Сериализуем данные в FormData MIME
    const transformedData = new FormData()
    // Логируем данные перед отправкой
    //console.log("Posting photo with transformedData:", data);

    transformedData.append('title', data.title);
    transformedData.append('description', data.description);

    // Check if data.image is a File or FileList
    if (data.image instanceof File) {
      transformedData.append('image', data.image);
    } else if (data.image instanceof FileList) {
      Array.from(data.image).forEach((file) => {
        transformedData.append('image', file);
      });
    } else {
      console.error("data.image should be a File or FileList");
    }
    // Выполняем запрос, добавляя заголовок Content-Type
    return handleRequest(() => api.post('/albums', transformedData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }));
  },
  updatePhoto: (data) => {
    // Сериализуем данные в FormData MIME
    const transformedData = new FormData()
    // Логируем данные перед отправкой
    transformedData.append('title', data.title);
    transformedData.append('description', data.description);

    // Check if data.image is a File or FileList
    if (data.image instanceof File) {
      transformedData.append('image', data.image);
    } else if (data.image instanceof FileList) {
      Array.from(data.image).forEach((file) => {
        transformedData.append('image', file);
      });
    } else {
      console.error("data.image should be a File or FileList");
    }
    // Выполняем запрос, добавляя заголовок Content-Type
    return handleRequest(() => api.put(`/albums/${data.id}`, transformedData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }));
  },
};

const transformResponseAPhotoForMapForPostPhoto = (data) => {
  //console.log(data);
  // Извлечение основных полей
  const transformedData = data;
  // const transformedData = {
  //     name: data.name || '',
  //     surname: data.surname || '',
  //     patronymic: data.patronymic || '',
  // };

  // // Если есть данные о местах, извлекаем информацию о месте заключения
  // if (data.places && data.places.length > 0) {
  //     const place = data.places[0]; // Предполагаем, что первое место в списке - нужное
  //     transformedData.placeOfDetention = place.places || [''];
  //     transformedData.dateFrom = place.dateFrom || '';
  //     transformedData.dateTo = place.dateTo || '';
  // }

  // console.log(transformedData)

  return transformedData;
};

export default searchService;
