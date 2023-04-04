import axios from "axios";

export const useApi = () => {
  const api = axios.create({
    baseURL: "https://api-rest-escola.azurewebsites.net",
  });

  const apiPost = async (path: string, data: any, config?: any) => {
    const response = await api.post(path, data, config ? config : {});
    return response;
  };

  const apiGet = async (path: string, config?: any) => {
    const response = await api.get(path, config ? config : {});
    return response;
  };

  const apiDelete = async (path: string) => {
    const response = await api.delete(path);
    return response;
  };

  return { apiDelete, apiGet, apiPost };
};
