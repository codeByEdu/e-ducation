import axios from "axios";

const api = axios.create({
    baseURL: "http://api-rest-escola.azurewebsites.net",
});

export default api;