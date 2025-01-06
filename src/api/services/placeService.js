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
    getAllYearsAndPlaces: () =>
        handleRequest(() => api.get(`/places/data?page=0&size=100`)),
    getAllPlacesForPostHuman: () =>
        handleRequest(async () => {
            const response = await api.get(`/places?page=0&size=100`);
            return transformResponseAllPlacesForMapForPostHuman(
                response.data.content,
            );
        }),
    getAllRegions: () =>
        handleRequest(async () => {
            const response = await api.get(`/regions?page=0&size=100`);
            // console.log(response.data)
            return transformResponseAllRegionsForMapForPostPlace(
                response.data.content,
            );
        }),
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
            locationDescription:
                transformedObj.locationDescription ?? "описание не определено",
            shortDescription:
                transformedObj.shortDescription ?? "описание Тростенец",
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
