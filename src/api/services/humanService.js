import api from '../axiosInstance';
import handleRequest from '../requestHelper';

const humanService = {
    getAllHumans: () => handleRequest(() => api.get('/humans')),
    getAllHistories: () => handleRequest(() => api.get('/humans/history')),
    getAllHistoriesForPrisonerStories: () => handleRequest(async () => {
        const response = await api.get('/humans/history');
        return transformResponseAllHistoriesForPrisonerStories(response.data);
    }),
    // getAllHistories: ()=> api.get('/humans/history'),
    getHumanById: (id) => handleRequest(() => api.get(`/humans/${id}`)),
    createHuman: (data) => handleRequest(() => api.post('/humans', data)),
    deleteHumanById: (id) => handleRequest(() => api.delete(`/humans/${id}`)),
    //   updateUser: (id, data) => handleRequest(() => api.put(`/users/${id}`, data)),
};


const transformResponseAllHistoriesForPrisonerStories = (data) => {
    // Трансформировать данные ответа перед передачей их дальше
    console.log("data in data",data)
    const returnData = {
        
        data: data.map((obj) => {
            // Разделяем описание на слова, берем первые 15 и объединяем их обратно в строку
            const shortDescription = obj.history.description.split(' ').slice(0,16  ).join(' ');
            const returnObj = {
                id: obj.id,
                img: obj.images[0].urlToFile,
                header: obj.surname + " " + obj.name + " " + obj.patronymic,
                description: shortDescription,
            };
            return returnObj;
        })
    }
    console.log("returnData in transformResponse", returnData);
    return returnData;
};

export default humanService;
