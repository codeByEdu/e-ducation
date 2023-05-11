import axios from "axios";

export const useApi = () => {
  const api = axios.create({
    baseURL: "api-rest-escola.azurewebsites.net",
  });

  const apiPost = async (path: string, data: any, config?: any) => {
    const response = await api.post(path, data, config ? config : {});
    return response;
  };

  const apiPatch = async (path: string, data: any) => {
    const response = await api.patch(path, data);
    return response;
  };

  const apiPut = async (path: string, data: any) => {
    const response = await api.put(path, data);
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

  return { apiDelete, apiGet, apiPost, apiPatch, apiPut };
};
