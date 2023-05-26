import client, { addBearerToken } from "../../axios/client";

export const getProduct = (slug: string, accessToken: string) => {
  client.interceptors.request.use(addBearerToken(accessToken));

  return client.get(`/v2/products/${slug}`);
};
