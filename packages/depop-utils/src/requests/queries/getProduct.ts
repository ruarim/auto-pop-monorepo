import client, { addBearerToken } from "../../axios/client";
import { Product } from "./getShopProducts";

type ProductResponse = {
  data: Product;
};

export const getProduct = (slug: string, accessToken: string) => {
  client.interceptors.request.use(addBearerToken(accessToken));

  try {
    return client.get(`/v2/products/${slug}`) as Promise<ProductResponse>;
  } catch (e: any) {
    console.log(`Failed to fetch product: ${(e as Error).message}`);
  }
};
