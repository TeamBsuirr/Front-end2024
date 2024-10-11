import api from '../axiosInstance';
import handleRequest from '../requestHelper';

const placeService = {

  getPlaceById: (id) => handleRequest(() => api.get(`/places/${id}`)),
  getAllPlaces: () => handleRequest(async () => {
    const response = await api.get(`/places`)
    return transformResponseAllPlacesForMap(response.data);
  }),
  getAllPlacesForPostHuman: () => handleRequest(async () => {
    const response = await api.get(`/places`)
    return transformResponseAllPlacesForMapForPostHuman(response.data);
  }),
  postPlace: (data) => {
    // Сериализуем данные в FormData MIME
    const transformedData = new FormData()
    // Логируем данные перед отправкой
    //console.log("Posting story with transformedData:", data);

    transformedData.append('placeName', data.placeName);
    transformedData.append('countDeath', data.countDeath);
    transformedData.append('history.article', data.article);
    transformedData.append('history.description', data.description);
    transformedData.append('regionId', data.regionId);
    transformedData.append('dateOfFoundation', data.dateOfFoundation);
    transformedData.append('locationDescription', data.locationDescription);
    transformedData.append('shortDescription', data.shortDescription);
    transformedData.append('coordinates.latitude', data.latitude);
    transformedData.append('coordinates.longitude', data.longitude);

    data.files.forEach((file, index) => {
      transformedData.append('images', file);
    });

    // Логируем данные перед отправкой
    //console.log("Posting place with transformedData:", transformedData);

    // Выполняем запрос, добавляя заголовок Content-Type
    return handleRequest(() => api.post('/places', transformedData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }));
  },
  deletePlaceById: (id) => handleRequest(() => api.delete(`/places/${id}`)),
};

const transformResponseAllPlacesForMapForPostHuman = (data) => {

  //console.log(data);
  const transformedData = data.map((obj) => {
    return {
      id: obj.id,
      name: obj.placeName,
    };
  });

  // Создаем окончательный объект с полями data, places и years
  const returnData = {
    data: transformedData
  };

  // console.log("returnData in transformResponse", returnData);
  return returnData;
};


const transformResponseAllPlacesForMap = (data) => {

  //console.log(data);
  const transformedData = data.map((obj) => {
    return {
      id: obj.id,
      placeName: obj.placeName,
      locationDescription: obj.locationDescription ?? "описание не определено",
      shortDescription: obj.shortDescription ?? "описание Тростенец",
      coordinates: obj.coordinates,
      previewImg: obj.images[0].urlToFile ?? "https://uzniki.storage.yandexcloud.net/1721029769100_zhimanov-trostenecz.jpg",
    };
  });

  // Создаем окончательный объект с полями data, places и years
  const returnData = {
    data: transformedData
  };

  // console.log("returnData in transformResponse", returnData);
  return returnData;
};



export default placeService;
