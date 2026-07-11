import axios from "axios";

const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default privateApi;