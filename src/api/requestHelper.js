import { notification } from 'antd';
import api from './axiosInstance';

const handleRequest = async (request) => {
  try {
    //console.log("Request started",request);

    
    // Логируем формат данных
    const config = request.config ? request.config : {};
    if (config.data) {
      //console.log("Request body data:", config.data);
    }
    //console.log("whole config",config)



    const response = await request();
    //console.log("Request successful:", response); // Преобразованные данные
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);

      if (error.response.data.message) {
        //console.log("123123123")
        notification.error({
          message: 'Ошибка получения данных c сервера',
          description: 'Ошибка получения данных с сервера: ' + error.response.data.message
        });
      }

      if (error.response.message) {
        //console.log("123123123")
        notification.error({
          message: 'Ошибка получения данных c сервера',
          description: 'Ошибка получения данных с сервера: ' + error.response.message
        });
      }


    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export default handleRequest;
