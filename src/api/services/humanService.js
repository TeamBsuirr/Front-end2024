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
        return { data: transformResponseAHumanForMapForPostHuman(response.data) };
    }),
    // createHuman: (data) => handleRequest(() => api.post('/humans', data)),
    postHuman: (data) => {
        // Сериализуем данные в FormData MIME
        const transformedData = new FormData()
        // Логируем данные перед отправкой
        //console.log("Posting story with transformedData:", data);

        transformedData.append('name', data.name);
        transformedData.append('surname', data.surname);
        transformedData.append('patronymic', data.patronymic);
        transformedData.append('dateOfBirth', data.dateOfBirth);
        transformedData.append('placeOfBirth', data.placeOfBirth);
        transformedData.append('dateOfDie', data.dateOfDie);

        transformedData.append('history.article', "История");
        transformedData.append('history.description', data.history);

        // Separate and append files
        const images = data.files.filter(file => file.type.startsWith('image/'));
        const videos = data.files.filter(file => file.type.startsWith('video/'));

        // Append images
        images.forEach((file) => {
            transformedData.append('images', file);
        });

        // Append videos
        videos.forEach((file) => {
            transformedData.append('videos', file);
        });

        // Append places with a flattened structure
        data.places.forEach((place, index) => {
            transformedData.append(`places[${index}].placeId`, place.id);
            transformedData.append(`places[${index}].dateFrom`, place.dateFrom);
            transformedData.append(`places[${index}].dateTo`, place.dateTo);
        });

        // Выполняем запрос, добавляя заголовок Content-Type
        return handleRequest(() => api.post('/humans', transformedData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }));
    },
    updateHuman: (data) => {
        
        // Сериализуем данные в FormData MIME
        const transformedData = new FormData()

        transformedData.append('name', data.name);
        transformedData.append('surname', data.surname);
        transformedData.append('patronymic', data.patronymic);
        transformedData.append('dateOfBirth', data.dateOfBirth);
        transformedData.append('placeOfBirth', data.placeOfBirth);
        transformedData.append('dateOfDie', data.dateOfDie);

        transformedData.append('history.article', "История");
        transformedData.append('history.description', data.history);

        // Separate and append files
        const images = data.files.filter(file => file.type.startsWith('image/'));
        const videos = data.files.filter(file => file.type.startsWith('video/'));

        // Append images
        images.forEach((file) => {
            transformedData.append('images', file);
        });

        // Append videos
        videos.forEach((file) => {
            transformedData.append('videos', file);
        });

        // Append places with a flattened structure
        data.places.forEach((place, index) => {
            transformedData.append(`places[${index}].placeId`, place.id);
            transformedData.append(`places[${index}].dateFrom`, place.dateFrom);
            transformedData.append(`places[${index}].dateTo`, place.dateTo);
        });
        console.log(data)
        // Выполняем запрос, добавляя заголовок Content-Type
        return handleRequest(() => api.put(`/humans/${data.id}`, transformedData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }));
    },
    deleteHumanById: (id) => handleRequest(() => api.delete(`/humans/${id}`)),
};

const transformResponseAHumanForMapForPostHuman = (data) => {
    //console.log(data);
    // Извлечение основных полей
    const transformedData = {
        name: data.name || '',
        surname: data.surname || '',
        patronymic: data.patronymic || '',
        dateOfBirth: data.dateOfBirth || '',
        dateOfDie:data.dateOfDie || '',
        placeOfBirth: data.placeOfBirth || '',
       // places: data.places || [], // Заполнится ниже
       places: [],
        dateFrom: '',
        dateTo: '',
        history: data.history?.description || '',
        files: [...(data.images || []), ...(data.videos || [])], // Объединение images и videos
    };

    // Если есть данные о местах, извлекаем информацию о месте заключения
    if (data.places && data.places.length > 0) {
        // const place = data.places[0]; // Предполагаем, что первое место в списке - нужное
        transformedData.places = data.places.map((place) => {
            //console.log(place)
            return {
                id: place?.place.id || '',
                name: place?.place.placeName || '',
                dateFrom: place.dateFrom || '',
                dateTo: place.dateTo || '',
            }
        })
    }

    //console.log(transformedData)

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
