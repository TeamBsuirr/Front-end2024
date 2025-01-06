import api from "../axiosInstance";
import handleRequest from "../requestHelper";
import { addMainImagePreview } from "../../utils/globalFunctions";

const searchService = {
    getGlobalSearch: (stringSearch, page = 0, size = 15) =>
        handleRequest(async () => {
            const response = await api.get(
                `/filter-search?search=${stringSearch}&page=${page}&size=${size}`,
            );

            // console.log(response)

            response.data.humans.content.map((item) =>
                addMainImagePreview(item),
            ); // Применяем функцию к каждому объекту массива

            return {
                data: {
                    // humans: response.data.humans.content,
                    // places: response.data.places.content,
                    humans: response.data.humans.content.map((item) =>
                        addMainImagePreview(item),
                    ),
                    places: response.data.places.content.map((item) =>
                        addMainImagePreview(item),
                    ),
                    totalElementsHumans: response.data.humans.totalElements,
                    totalPagesHumans: response.data.humans.totalPages,
                    totalElementsPlaces: response.data.places.totalElements,
                    totalPagesPlaces: response.data.places.totalPages,
                },
            };
        }),
    getAllPhotos: (page = 0, size = 15) =>
        handleRequest(async () => {
            const response = await api.get(`/albums?page=${page}&size=${size}`);
            //console.log(response)
            return {
                data: {
                    data: response.data.content,
                    totalElements: response.data.totalElements,
                    totalPages: response.data.totalPages,
                },
            };
            // totalElements: response.data.totalElements,
            // totalPages: response.data.totalPages,
        }),
};

export default searchService;
