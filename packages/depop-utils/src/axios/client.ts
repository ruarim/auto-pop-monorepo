import axios from "axios";

const DEPOP_API_ENDPOINT = "https://webapi.depop.com/api";

const client = axios.create({
  baseURL: DEPOP_API_ENDPOINT,
});

export const addBearerToken = (accessToken: string) => {
  return (config: any) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    return config;
  };
};

export default client;
