import { addMainImagePreview, parseCalendarContentToInputId } from "../../utils/globalFunctions";
import api from "../axiosInstance";
import handleRequest from "../requestHelper";

const humanService = {
    getAllHistoriesForPrisonerStories: (page = 0, size = 15, alphabetic = '', place = '', year = '') =>
        handleRequest(async () => {
            // старое до фильтрации влада
            //const response = await api.get(`/humans?page=${page}&size=${size}`);

            let queryParams = `?page=${page}&size=${size}`;

            // Добавляем параметр alphabetic, если он не пустой
            if (alphabetic) {
                const parsedAlphabetic = parseCalendarContentToInputId(alphabetic);


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

            const answerArrayHumans = transformResponseAllHistoriesForPrisonerStories(
                response.data.content
            );


            return {
                data: {
                    histories: answerArrayHumans.data?.histories,
                    totalElements: response.data?.totalElements,
                    totalPages: response.data?.totalPages,
                }

            }

        }),
    getHumanById: (id) => handleRequest(() => api.get(`/humans/${id}`)),
    getHumanByIdForPostHuman: (id) =>
        handleRequest(async () => {
            const response = await api.get(`/humans/${id}`);
            return {
                data: transformResponseAHumanForMapForPostHuman(response.data)
            };
        }),
    // createHuman: (data) => handleRequest(() => api.post('/humans', data)),
    postHuman: (data) => {
        // Сериализуем данные в FormData MIME
        const transformedData = new FormData();
        // Логируем данные перед отправкой
        //console.log("Posting story with transformedData:", data);

        transformedData.append("name", data.name);
        transformedData.append("surname", data.surname);
        transformedData.append("patronymic", data.patronymic);
        transformedData.append("dateOfBirth", data.dateOfBirth);
        transformedData.append("placeOfBirth", data.placeOfBirth);
        transformedData.append("dateOfDie", data.dateOfDie);

        transformedData.append("history.article", "История");
        transformedData.append("history.description", data.history);

        // Separate and append files
        const images = data.files.filter((file) =>
            file.type.startsWith("image/"),
        );
        const videos = data.files.filter((file) =>
            file.type.startsWith("video/"),
        );

        // Append images
        images.forEach((file, index) => {
            // transformedData.append("images", file);

            // Добавляем файл
            transformedData.append(`images[${index}].img`, file.file);
            // Добавляем флаг isMain для каждого изображения
            transformedData.append(`images[${index}].isMain`, file.isMain || false);
        });

        //console.log(videos)
        // Append videos
        videos.forEach((file) => {
            transformedData.append("videos", file.file);

            // Добавляем файл
            //transformedData.append(`videos[${index}]`, file.file);
        });

        // Append places with a flattened structure
        data.places.forEach((place, index) => {
            transformedData.append(`places[${index}].placeId`, place.id);
            transformedData.append(`places[${index}].dateFrom`, place.dateFrom);
            transformedData.append(`places[${index}].dateTo`, place.dateTo);
        });

        // Выполняем запрос, добавляя заголовок Content-Type
        return handleRequest(() =>
            api.post("/humans", transformedData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        );
    },
    updateHuman: (data) => {
        // Сериализуем данные в FormData MIME
        const transformedData = new FormData();

        transformedData.append("name", data.name);
        transformedData.append("surname", data.surname);
        transformedData.append("patronymic", data.patronymic);
        transformedData.append("dateOfBirth", data.dateOfBirth);
        transformedData.append("placeOfBirth", data.placeOfBirth);
        transformedData.append("dateOfDie", data.dateOfDie);

        transformedData.append("history.article", "История");
        transformedData.append("history.description", data.history);

        // console.log(data.files)

        // Separate and append files
        const images = [];
        const videos = [];
        const newImages = [];
        const newVideos = [];

        data.files.forEach((file) => {

            let fileType;

            // Проверка для Yandex-источников
            if (file.cameFrom === "yandex") {
                const preview = file?.preview;

                if (preview) {
                    // Проверяем, является ли файл изображением
                    if (preview.match(/\.(jpeg|jpg|png|gif|bmp|tiff|svg)$/i)) {
                        fileType = "image/jpeg";  // Присваиваем универсальный тип для изображений
                    }
                    // Проверяем, является ли файл видео
                    else if (preview.match(/\.(mp4|avi|mov|mkv)$/i)) {
                        fileType = "video/mp4";  // Присваиваем универсальный тип для видео
                    } else {
                        fileType = undefined;  // Для всех других типов оставляем неопределенным
                    }
                } else {
                    fileType = undefined;
                }
            }
            else {
                fileType = file.type || (file?.file?.type);  // Определяем тип по умолчанию
            }

            // Обрабатываем файлы по типам
            if (fileType && fileType.startsWith("image/")) {
                if (file?.id) {
                    // Для существующих изображений, добавляем только ID
                    images.push({
                        id: file.id,
                        isMain: file.isMain || false, // Присваиваем флаг isMain
                    });

                } else if (file?.file?.id) {
                    // Для существующих файлов, у которых есть id
                    images.push({
                        id: file.file.id,
                        isMain: file.isMain || false,
                    });
                } else {
                    // Обрабатываем новые изображения
                    newImages.push({
                        file: file.file, // Сохраняем сам файл
                        isMain: file.isMain || false, // Присваиваем флаг isMain
                    });
                }
            } else if (fileType && fileType.startsWith("video/")) {
                if (file?.id) {
                    videos.push(file.id); // Append the id as a number
                } else if (file?.file?.id) {
                    videos.push(file.file.id); // Append the id as a number
                } else {
                    newVideos.push(file.file); // Append the whole file if it doesn't have an id
                }
            }


        });

        //console.log(images, videos, newImages)
        // Append all image ids and video ids to transformedData
        if (images.length > 0) {
            images.forEach((image, index) => {
                transformedData.append(`images[${index}].id`, image.id);
                // Добавляем флаг isMain для каждого изображения
                transformedData.append(`images[${index}].isMain`, image.isMain);
            });
        } else {
            transformedData.append("images", images); // Add empty array as a string
        }

        if (videos.length > 0) {
            videos.forEach(id => transformedData.append("videos", id));
        } else {
            transformedData.append("videos", videos); // Add empty array as a string
        }

        // Append new images and new videos (files) to transformedData
        if (newImages.length > 0) {
            newImages.forEach((file, index) => {
                transformedData.append(`newImages[${index}].img`, file.file); // Добавляем сам файл
                transformedData.append(`newImages[${index}].isMain`, file.isMain); // Добавляем флаг isMain
            });
        }
        newVideos.forEach(file => transformedData.append("newVideos", file));




        // Append places with a flattened structure
        data.places.forEach((place, index) => {
            transformedData.append(`places[${index}].placeId`, place.id);
            transformedData.append(`places[${index}].dateFrom`, place.dateFrom);
            transformedData.append(`places[${index}].dateTo`, place.dateTo);
        });

        // Log the final categories
        const transformedDataObject = {};
        // Log the contents of transformedData
        for (let pair of transformedData.entries()) {
            const key = pair[0];
            const value = pair[1];

            // Check if the value is a File object and handle it accordingly
            if (value instanceof File) {
                transformedDataObject[key] = `File: ${value.name}`;  // or any other info about the file you want to log
            } else {
                transformedDataObject[key] = value;
            }
        }

        // Log the final transformed data as a JSON object
       // console.log('Transformed Data as JSON:', transformedDataObject);


        // Выполняем запрос, добавляя заголовок Content-Type
        return handleRequest(() =>
            api.put(`/humans/${data.id}`, transformedData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        );
    },
    deleteHumanById: (id) => handleRequest(() => api.delete(`/humans/${id}`)),
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
            const transformedObject = addMainImagePreview(obj)

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
