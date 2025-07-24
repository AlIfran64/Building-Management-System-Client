import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://brickbase-server.vercel.app',
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
