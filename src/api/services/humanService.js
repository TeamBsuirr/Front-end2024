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
    getHumanByIdForPostHuman: (id) => handleRequest(async () => {
        const response = await api.get(`/humans/${id}`)
        return {data:transformResponseAHumanForMapForPostHuman(response.data)};
    }),
    // createHuman: (data) => handleRequest(() => api.post('/humans', data)),
    postHuman: (data) => {
        // Сериализуем данные в FormData MIME
        const transformedData = new FormData()
        // Логируем данные перед отправкой
        console.log("Posting story with transformedData:", data);

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
        console.log("Posting place with transformedData:", transformedData);

        // Выполняем запрос, добавляя заголовок Content-Type
        return handleRequest(() => api.post('/humans', transformedData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }));
    },
    deleteHumanById: (id) => handleRequest(() => api.delete(`/humans/${id}`)),
};

// {
//     "name": "string",
//     "surname": "string",
//     "patronymic": "string",
//     "dateOfBirth": "2024-08-14",
//     "placeOfBirth": "string",
//     "dateOfDie": "2024-08-14",
//     "images": [
//       "string"
//     ],
//     "videos": [
//       "string"
//     ],
//     "places": [
//       {
//         "placeId": 0,
//         "dateFrom": "2024-08-14",
//         "dateTo": "2024-08-14"
//       }
//     ],
//     "history": {
//       "article": "string",
//       "description": "string"
//     }
//   }

const transformResponseAHumanForMapForPostHuman = (data) => {
    console.log(data);
    // Извлечение основных полей
    const transformedData = {
        name: data.name || '',
        surname: data.surname || '',
        patronymic: data.patronymic || '',
        dateOfBirth: data.dateOfBirth || '',
        placeOfBirth: data.placeOfBirth || '',
        placeOfDetention: [''], // Заполнится ниже
        dateFrom: '',
        dateTo: '',
        history: data.history?.description || '',
        files: [...(data.images || []), ...(data.videos || [])], // Объединение images и videos
    };

    // Если есть данные о местах, извлекаем информацию о месте заключения
    if (data.places && data.places.length > 0) {
        const place = data.places[0]; // Предполагаем, что первое место в списке - нужное
        transformedData.placeOfDetention = place.places || [''];
        transformedData.dateFrom = place.dateFrom || '';
        transformedData.dateTo = place.dateTo || '';
    }

    console.log(transformedData)

    return transformedData;
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
