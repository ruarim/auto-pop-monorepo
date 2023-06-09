import { DEPOP_API_ENDPOINT } from "../constants";
import axios from "axios";

export type Product = {
  id: number;
  slug: string;
  pictures: {
    id: number;
    width: number;
    height: number;
    url: string;
  }[][];
  price: {
    priceAmount: string;
    currencyName: string;
    nationalShippingCost: string;
    internationalShippingCost?: string;
  };
  sold: boolean;
};

export type ProductsResponse = {
  meta: {
    limit: number;
    last_offset_id: string;
    end: boolean;
  };
  products: Product[];
};

const getShopPaginated = async (
  shopId: number,
  offsetId: string,
  products: Product[]
): Promise<Product[]> => {
  try {
    const res = await axios.get(
      `${DEPOP_API_ENDPOINT}/v1/shop/${shopId}/products/?limit=1000&offset_id=${offsetId}`
    );
    const data = res.data as ProductsResponse;

    data.products.map((product) => products.push(product));

    if (!data.meta.end)
      return getShopPaginated(shopId, data.meta.last_offset_id, products);
    else return products;
  } catch (e: any) {
    console.log(`Failed to fetch shop products: ${(e as Error).message}`);
    throw new Error(`Failed to fetch shop products: ${(e as Error).message}`);
  }
};

export const getShopProducts = async (shopId: number) => {
  let offsetId = "";
  const products = await getShopPaginated(shopId, offsetId, []);
  return products;
};
