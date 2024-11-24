import axiosInstance from '../axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = async (registerData) => {
  try {
    const response = await axiosInstance.post(`register`, registerData)
    return response.data
  } catch (error) {
    if (['ERR_NETWORK', 'ERR_BAD_REQUEST'].includes(error.code)) {
      throw new ConnectionError()
    }
  }
}

export const login = async (loginData) => {
  try {
    const response = await axiosInstance.post(`login`, loginData);
    console.log("RESPONSE", response)
  
    AsyncStorage.setItem('token', response.headers['authorization']);
    
    return response.data;
  } catch (error) {
    
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 404) {
        throw new Error(error.response.data.title);
      } else if (statusCode === 500) {
        throw new Error('Error interno del servidor: Intenta más tarde.');
      }
    } else {
      throw new Error('No se pudo conectar con el servidor.');
    }
  }
};


export const getUser = async () => {
  try {
    const response = await axiosInstance.get('user')
    return response.data
  } catch (error) {
    if (['ERR_NETWORK', 'ERR_BAD_REQUEST'].includes(error.code)) {
      throw new ConnectionError()
    }
  }
} 

class ConnectionError extends Error {
  constructor(message) {
    super(message)
    this.name = 'Estamos en mantenimiento. Por favor, Intentelo mas tarde.'
  }
}