import axios from "axios";

const publicApi = axios.create({
    baseURL: "https://ai-expense-analyzer-29z5.onrender.com/api/",
});

export default publicApi;