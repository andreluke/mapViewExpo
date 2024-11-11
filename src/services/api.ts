import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log(process.env.EXPO_PUBLIC_BACKEND_URL)

export default api;
