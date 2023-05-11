import axios from "axios";

const api = axios.create({
    baseURL: "https://api-rest-escola.azurewebsites.net",
});

export default api;