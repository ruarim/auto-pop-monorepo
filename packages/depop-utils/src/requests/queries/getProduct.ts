import { DEPOP_API_ENDPOINT } from "../constants";
import { Product } from "./getShopProducts";
import axios from "axios";

type ProductResponse = {
  data: Product;
};

export const getProduct = (slug: string, accessToken: string) => {
  try {
    return axios.get(`${DEPOP_API_ENDPOINT}/v2/products/${slug}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }) as Promise<ProductResponse>;
  } catch (e: any) {
    console.log(`Failed to fetch product: ${(e as Error).message}`);
  }
};
