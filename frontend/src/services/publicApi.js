import axios from "axios";

console.log("ENV =", import.meta.env);
console.log("API =", import.meta.env.VITE_API_URL);

const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default publicApi;