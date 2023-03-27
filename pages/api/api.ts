import axios from "axios";

const api = axios.create({
    baseURL: "api-rest-escola.azurewebsites.net",
});

export default api;