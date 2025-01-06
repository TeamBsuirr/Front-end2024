import api from "../axiosInstance";
import handleRequest from "../requestHelper";
import {
    addMainImagePreview,
    parseCalendarContentToInputId,
} from "../../utils/globalFunctions";

const humanService = {
    getAllHistoriesForPrisonerStories: (
        page = 0,
        size = 15,
        alphabetic = "",
        place = "",
        year = "",
    ) =>
        handleRequest(async () => {
            // старое до фильтрации влада
            //const response = await api.get(`/humans?page=${page}&size=${size}`);

            let queryParams = `?page=${page}&size=${size}`;

            // Добавляем параметр alphabetic, если он не пустой
            if (alphabetic) {
                const parsedAlphabetic =
                    parseCalendarContentToInputId(alphabetic);

                queryParams += `&alphabetic=${parsedAlphabetic}`;
            }

            // Добавляем параметр place, если он не пустой
            if (place) {
                queryParams += `&place=${place}`;
            }

            // Добавляем параметр year, если он не пустой
            if (year) {
                queryParams += `&year=${year}`;
            }

            // Отправляем запрос с динамически сформированными параметрами
            const response = await api.get(`/humans/history${queryParams}`);

            //console.log(response)

            const answerArrayHumans =
                transformResponseAllHistoriesForPrisonerStories(
                    response.data.content,
                );

            return {
                data: {
                    histories: answerArrayHumans.data?.histories,
                    totalElements: response.data?.totalElements,
                    totalPages: response.data?.totalPages,
                },
            };
        }),
    getHumanById: (id) => handleRequest(() => api.get(`/humans/${id}`)),
    getHumanByIdForPostHuman: (id) =>
        handleRequest(async () => {
            const response = await api.get(`/humans/${id}`);
            return {
                data: transformResponseAHumanForMapForPostHuman(response.data),
            };
        }),
};

const transformResponseAHumanForMapForPostHuman = (data) => {
    // Извлечение основных полей
    const transformedData = {
        name: data.name || "",
        surname: data.surname || "",
        patronymic: data.patronymic || "",
        dateOfBirth: data.dateOfBirth || "",
        dateOfDie: data.dateOfDie || "",
        placeOfBirth: data.placeOfBirth || "",
        // places: data.places || [], // Заполнится ниже
        places: [],
        dateFrom: "",
        dateTo: "",
        history: data.history?.description || "",
        files: [...(data.images || []), ...(data.videos || [])], // Объединение images и videos
    };

    // Если есть данные о местах, извлекаем информацию о месте заключения
    if (data.places && data.places.length > 0) {
        // const place = data.places[0]; // Предполагаем, что первое место в списке - нужное
        transformedData.places = data.places.map((place) => {
            return {
                id: place?.place.id || "",
                name: place?.place.placeName || "",
                dateFrom: place.dateFrom || "",
                dateTo: place.dateTo || "",
            };
        });
    }

    return transformedData;
};

const transformResponseAllHistoriesForPrisonerStories = (data) => {
    // Трансформировать данные ответа перед передачей их дальше
    // Инициализируем Set для уникальных мест и годов
    let transformedData;

    if (data.length !== 0) {
        transformedData = data.map((obj) => {
            // Разделяем описание на слова, берем первые 15 и объединяем их обратно в строку
            const shortDescription = obj.history.description
                .split(" ")
                .slice(0, 16)
                .join(" ");

            // Выбираем preview
            const transformedObject = addMainImagePreview(obj);

            return {
                id: transformedObject.id,
                img: transformedObject.previewImg,
                header: `${transformedObject.surname} ${transformedObject.name} ${transformedObject.patronymic}`,
                description: shortDescription,
            };
        });
    } else {
        transformedData = [];
    }

    // Создаем окончательный объект с полями data, places и years
    const returnData = {
        data: {
            histories: transformedData,
        },
    };

    return returnData;
};

export default humanService;
