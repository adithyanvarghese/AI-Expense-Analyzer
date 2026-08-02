import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ai-expense-analyzer-29z5.onrender.com/api/";

const privateApi = axios.create({
  baseURL: API_BASE_URL,
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default privateApi;