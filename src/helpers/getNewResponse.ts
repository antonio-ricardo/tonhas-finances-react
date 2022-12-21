import { AxiosRequestConfig } from "axios";
import { api } from "../services/api";
import { getCookies } from "../services/cookies";

export const getNewResponse = async (
  responseConfig: AxiosRequestConfig<any>
) => {
  const data = JSON.parse(responseConfig.data || "{}");

  const url = responseConfig.url as string;

  const headers = {
    ...responseConfig.headers,
    authorization: `Bearer ${getCookies("tonhas-finances:acess-token")}`,
  };

  switch (responseConfig.method) {
    case "get":
      return await api.get(url, { headers });
    case "post":
      return await api.post(url, data, { headers });
    case "put":
      return await api.put(url, data, { headers });
    case "delete":
      return await api.put(url, data, { headers });
    case "patch":
      return await api.put(url, data, { headers });
    default:
      throw new Error();
  }
};
