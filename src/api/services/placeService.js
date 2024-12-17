import api from "../axiosInstance";
import handleRequest from "../requestHelper";
import { addMainImagePreview } from "../../utils/globalFunctions";

const placeService = {
    getPlaceById: (id) => handleRequest(() => api.get(`/places/${id}`)),
    getAllPlaces: () =>
        handleRequest(async () => {
            const response = await api.get(`/places?page=0&size=100`);
            return transformResponseAllPlacesForMap(response.data.content);
        }),
    getAllYearsAndPlaces: () => handleRequest(() => api.get(`/places/data?page=0&size=100`)),
    getAllPlacesForPostHuman: () =>
        handleRequest(async () => {
            const response = await api.get(`/places?page=0&size=100`);
            return transformResponseAllPlacesForMapForPostHuman(response.data.content);
        }),
    postPlace: (data) => {
        // Сериализуем данные в FormData MIME
        const transformedData = new FormData();
        // Логируем данные перед отправкой
        //("Posting story with transformedData:", data);

        transformedData.append("placeName", data.placeName);
        transformedData.append("countDeath", data.countDeath);
        transformedData.append("history.article", data.article);
        transformedData.append("history.description", data.history.description);
        transformedData.append("regionId", data.region.id);
        transformedData.append("dateOfFoundation", data.dateOfFoundation);
        transformedData.append("locationDescription", data.locationDescription);
        transformedData.append("shortDescription", data.shortDescription);

        // Преобразуем координаты в числа (double)
        const latitude = parseFloat(data.coordinates.latitude);
        const longitude = parseFloat(data.coordinates.longitude);
        transformedData.append("coordinates.latitude", latitude);
        transformedData.append("coordinates.longitude", longitude);

        // Добавляем изображения в FormData
        data.images.forEach((file, index) => {
            // Добавляем файл
            transformedData.append(`images[${index}].img`, file.file);
            // Добавляем флаг isMain для каждого изображения
            transformedData.append(`images[${index}].isMain`, file.isMain || false);
        });

        // Логируем данные перед отправкой
        // console.log("Logging FormData contents:");
        // transformedData.forEach((value, key) => {
        //     // Выводим ключ и значение в консоль
        //     if (value instanceof File) {
        //         console.log(`${key}: [File] ${value.name}`);
        //     } else {
        //         console.log(`${key}: ${value}`);
        //     }
        // });

        // Выполняем запрос, добавляя заголовок Content-Type
        return handleRequest(() =>
            api.post("/places", transformedData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        );
    },
    updatePlace: (data) => {
        // Сериализуем данные в FormData MIME
        const transformedData = new FormData();

        transformedData.append("placeName", data.placeName);
        transformedData.append("countDeath", data.countDeath);
        transformedData.append("history.article", data.article);
        transformedData.append("history.description", data.history.description);
        transformedData.append("regionId", data.region.id);
        transformedData.append("dateOfFoundation", data.dateOfFoundation);
        transformedData.append("locationDescription", data.locationDescription);
        transformedData.append("shortDescription", data.shortDescription);


        const latitude = parseFloat(data.coordinates.latitude);
        const longitude = parseFloat(data.coordinates.longitude);
        transformedData.append("coordinates.latitude", latitude);
        transformedData.append("coordinates.longitude", longitude);


        // Separate and append files
        const images = [];
        const newImages = [];

        data.images.forEach((file) => {

            // Обрабатываем существующие изображения
            if (file.id) {
                // Для существующих изображений, добавляем только ID
                images.push({
                    id: file.id,
                    isMain: file.isMain || false, // Присваиваем флаг isMain
                });
            } else if (file.file?.id) {
                // Для существующих файлов, у которых есть id
                images.push({
                    id: file.file.id,
                    isMain: file.isMain || false,
                });
            } else {
                // Обрабатываем новые изображения
                newImages.push({
                    file:file.file, // Сохраняем сам файл
                    isMain: file.isMain || false, // Присваиваем флаг isMain
                });
            }

        });

        // Добавляем существующие изображения (id)
        if (images.length > 0) {
            images.forEach((image, index) => {
                transformedData.append(`images[${index}].id`, image.id);
                // Добавляем флаг isMain для каждого изображения
                transformedData.append(`images[${index}].isMain`, image.isMain );
            });
        }
        // Добавляем новые изображения (files)
        if (newImages.length > 0) {
            newImages.forEach((file, index) => {
                transformedData.append(`newImages[${index}].img`, file.file); // Добавляем сам файл
                transformedData.append(`newImages[${index}].isMain`, file.isMain); // Добавляем флаг isMain
            });
        }

        // Логируем данные перед отправкой
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
      //  console.log('Transformed Data as JSON:', transformedDataObject);



        // Выполняем запрос, добавляя заголовок Content-Type
        return handleRequest(() =>
            api.put(`/places/${data.id}`, transformedData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        );
    },
    deletePlaceById: (id) => handleRequest(() => api.delete(`/places/${id}`)),

    postRegion: (data) => {
        // Сериализуем данные в FormData MIME
        const transformedData = new FormData();
        // Логируем данные перед отправкой

        transformedData.append("centralCity", data.centralCity);

        // Выполняем запрос, добавляя заголовок Content-Type
        return handleRequest(() =>
            api.post("/regions", transformedData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        );
    },
    getAllRegions: () =>
        handleRequest(async () => {
            const response = await api.get(`/regions?page=0&size=100`);
           // console.log(response.data)
            return transformResponseAllRegionsForMapForPostPlace(response.data.content);
        }),

    deleteRegionById: (id) => handleRequest(() => api.delete(`/regions/${id}`)),
};

const transformResponseAllRegionsForMapForPostPlace = (data) => {
    //console.log(data);
    const transformedData = data.map((obj) => {
        return {
            id: obj.id,
            name: obj.centralCity,
        };
    });

    // Создаем окончательный объект с полями data, places и years
    const returnData = {
        data: transformedData,
    };

    // console.log("returnData in transformResponse", returnData);
    return returnData;
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
        data: transformedData,
    };

    // console.log("returnData in transformResponse", returnData);
    return returnData;
};

const transformResponseAllPlacesForMap = (data) => {
    //console.log(data);
    const transformedData = data.map((obj) => {

        const transformedObj = addMainImagePreview(obj);
        //console.log(transformedObj)
        return {
            id: transformedObj.id,
            placeName: transformedObj.placeName,
            locationDescription: transformedObj.locationDescription ?? "описание не определено",
            shortDescription: transformedObj.shortDescription ?? "описание Тростенец",
            coordinates: transformedObj.coordinates,
            previewImg: transformedObj.previewImg,
        };
    });

    // Создаем окончательный объект с полями data, places и years
    const returnData = {
        data: transformedData,
    };

    // console.log("returnData in transformResponse", returnData);
    return returnData;
};


export default placeService;
