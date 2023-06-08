import client, { addBearerToken } from "../../axios/client";
import { getProduct } from "../queries/getProduct";

export type RefreshData = {
  slug: string;
  accessToken: string;
};

export const refresh = async (data: RefreshData) => {
  const productData = await getProduct(data.slug, data.accessToken);
  if (!productData) throw new Error("no product data");

  const product = productData.data;

  const refreshData = {
    ...product,
    priceAmount: product.price.priceAmount,
    nationalShippingCost: product.price.nationalShippingCost,
    internationalShippingCost: product.price?.internationalShippingCost,
    priceCurrency: product.price.currencyName,
    pictureIds: product.pictures.map((pic) => pic[0].id),
  };

  client.interceptors.request.use(addBearerToken(data.accessToken));

  try {
    return client.put(`/v2/products/${data.slug}`, refreshData);
  } catch (e: any) {
    throw new Error(`Failed to refresh product: ${(e as Error).message}`);
  }
};
