import api from '../axiosInstance';
import handleRequest from '../requestHelper';

const humanService = {
    getAllHumans: () => handleRequest(() => api.get('/humans')),
    getAllHistories: () => handleRequest(() => api.get('/humans/history')),
    getAllHistoriesForPrisonerStories: () => handleRequest(async () => {
        const response = await api.get('/humans/history');
        return transformResponseAllHistoriesForPrisonerStories(response.data);
    }),
    getHumanById: (id) => handleRequest(() => api.get(`/humans/${id}`)),
    createHuman: (data) => handleRequest(() => api.post('/humans', data)),
    deleteHumanById: (id) => handleRequest(() => api.delete(`/humans/${id}`)),
};


const transformResponseAllHistoriesForPrisonerStories = (data) => {
    // Трансформировать данные ответа перед передачей их дальше
    // Инициализируем Set для уникальных мест и годов
    const uniquePlaces = new Set();
    const uniqueYears = new Set();

    const transformedData = data.map((obj) => {
        // Разделяем описание на слова, берем первые 15 и объединяем их обратно в строку
        const shortDescription = obj.history.description.split(' ').slice(0, 16).join(' ');
        
        // Собираем места и годы из obj.places
        const places = obj.places.map(placeObj => placeObj.place.placeName);
        const years = obj.places.flatMap(place => {
            const yearFrom = place.dateFrom.split('-')[0];
            const yearTo = place.dateTo.split('-')[0];
            return [yearFrom, yearTo];
        });

        // Добавляем места и годы в Set для уникальных значений
        places.forEach(place => uniquePlaces.add(place));
        years.forEach(year => uniqueYears.add(year));

        return {
            id: obj.id,
            img: obj.images[0]?.urlToFile || '',
            header: `${obj.surname} ${obj.name} ${obj.patronymic}`,
            description: shortDescription,
            years: years,
            places: places,
        };
    });

    // Создаем окончательный объект с полями data, places и years
    const returnData = {
        data: {
            histories: transformedData,
            places: Array.from(uniquePlaces).sort(),
            years: Array.from(uniqueYears).sort((a, b) => a - b),
        }
    };

   // console.log("returnData in transformResponse", returnData);
    return returnData;
};

export default humanService;
