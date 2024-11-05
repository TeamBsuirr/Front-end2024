import api from "../axiosInstance";
import handleRequest from "../requestHelper";

const searchService = {
    getGlobalSearch: (stringSearch) =>
        handleRequest(() => api.get(`/filter-search?search=${stringSearch}`)),
    getAllPhotos: () => handleRequest(() => api.get("/albums")),
    getPhotoByIdForPostPhoto: (id) =>
        handleRequest(async () => {
            const response = await api.get(`/albums/${id}`);
            return {
                data: transformResponseAPhotoForMapForPostPhoto(response.data),
            };
        }),
};

const transformResponseAPhotoForMapForPostPhoto = (data) => {
    // Извлечение основных полей
    const transformedData = data;

    return transformedData;
};

export default searchService;
