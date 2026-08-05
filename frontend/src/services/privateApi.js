import axios from "axios";

const defaultUrl = (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))
  ? "http://localhost:8000/api/"
  : "https://ai-expense-analyzer-29z5.onrender.com/api/";

const API_BASE_URL = import.meta.env.VITE_API_URL || defaultUrl;

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