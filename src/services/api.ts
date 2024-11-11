import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Função para criar a instância do axios
export const createApi = (baseUrl: string): AxiosInstance => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Função que pega a URL do backend, que pode ser configurada para facilitar os testes
export const getBackendUrl = (): string => {
  return process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000"; // Defina um valor default
};

// Criação do api, utilizando a URL do backend
const api: AxiosInstance = createApi(getBackendUrl());

export default api;
