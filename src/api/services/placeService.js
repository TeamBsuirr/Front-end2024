import api from '../axiosInstance';
import handleRequest from '../requestHelper';

const placeService = {

  getPlaceById: (id) => handleRequest(() => api.get(`/places/${id}`)),
  getAllPlaces: () => handleRequest(async () => {
    const response = await api.get(`/places`)
    return transformResponseAllPlacesForMap(response.data);
  }),

};

const transformResponseAllPlacesForMap = (data) => {

  console.log(data);
  const transformedData = data.map((obj) => {
    return {
      id: obj.id,
      placeName: obj.placeName,
      locationDescription: obj.locationDescription ?? "описание не определено",
      shortDescription: obj.shortDescription ?? "описание Тростенец",
      coordinates: obj.coordinates,
      previewImg:obj.images[0].urlToFile ?? "https://uzniki.storage.yandexcloud.net/1721029769100_zhimanov-trostenecz.jpg",
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
