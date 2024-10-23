import api from "../axiosInstance";
import handleRequest from "../requestHelper";

const placeService = {
    getPlaceById: (id) => handleRequest(() => api.get(`/places/${id}`)),
    getAllPlaces: () =>
        handleRequest(async () => {
            const response = await api.get(`/places`);
            return transformResponseAllPlacesForMap(response.data);
        }),
    getAllPlacesForPostHuman: () =>
        handleRequest(async () => {
            const response = await api.get(`/places`);
            return transformResponseAllPlacesForMapForPostHuman(response.data);
        }),
    postPlace: (data) => {
        // Сериализуем данные в FormData MIME
        const transformedData = new FormData();
        // Логируем данные перед отправкой
        //console.log("Posting story with transformedData:", data);

        transformedData.append("placeName", data.placeName);
        transformedData.append("countDeath", data.countDeath);
        transformedData.append("history.article", data.article);
        transformedData.append("history.description", data.history.description);
        transformedData.append("regionId", data.region.id);
        transformedData.append("dateOfFoundation", data.dateOfFoundation);
        transformedData.append("locationDescription", data.locationDescription);
        transformedData.append("shortDescription", data.shortDescription);
        transformedData.append("coordinates.latitude", data.latitude);
        transformedData.append("coordinates.longitude", data.longitude);

        data.images.forEach((file) => {
            transformedData.append("images", file);
        });

        // Логируем данные перед отправкой
        //console.log("Posting place with transformedData:", transformedData);

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
        transformedData.append("coordinates.latitude", data.latitude);
        transformedData.append("coordinates.longitude", data.longitude);

        data.images.forEach((file) => {
            transformedData.append("images", file);
        });

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
            const response = await api.get(`/regions`);
            return transformResponseAllRegionsForMapForPostPlace(response.data);
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
        return {
            id: obj.id,
            placeName: obj.placeName,
            locationDescription:
                obj.locationDescription ?? "описание не определено",
            shortDescription: obj.shortDescription ?? "описание Тростенец",
            coordinates: obj.coordinates,
            previewImg:
                obj.images[0].urlToFile ??
                "https://uzniki.storage.yandexcloud.net/1721029769100_zhimanov-trostenecz.jpg",
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
