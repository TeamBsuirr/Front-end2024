  import api from './axiosInstance';

  const handleRequest = async (request) => {
    try {
      console.log("Request started");
      const response = await request();
      console.log("Request successful:", response); // Преобразованные данные
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      throw error;
    }
  };

  export default handleRequest;
