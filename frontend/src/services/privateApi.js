import axios from "axios";

const privateApi = axios.create({
  baseURL: "https://ai-expense-analyzer-29z5.onrender.com/api/",
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default privateApi;