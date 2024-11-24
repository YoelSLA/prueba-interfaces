import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const isAtFacultad = false;
const isLocalhost = false;

const facultad = '10.28.2.241';
const casa = '192.168.0.216';
const local = 'localhost';

const baseURL = `http://${isLocalhost ? local : isAtFacultad ? facultad : casa}:7070/`;

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;