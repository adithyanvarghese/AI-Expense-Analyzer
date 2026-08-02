import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ai-expense-analyzer-29z5.onrender.com/api/";

const publicApi = axios.create({
  baseURL: API_BASE_URL,
});

export default publicApi;