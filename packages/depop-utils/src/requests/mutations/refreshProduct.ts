import client, { addBearerToken } from "../../axios/client";
import type { Product } from "../queries/getShopProducts";

export type RefreshData = {
  slug: string;
  product: Product;
  accessToken: string;
};

export const refresh = (data: RefreshData) => {
  const product = data.product;
  const refreshData = {
    ...product,
    priceAmount: product.price.priceAmount,
    nationalShippingCost: product.price.nationalShippingCost,
    internationalShippingCost: product.price?.internationalShippingCost,
    priceCurrency: product.price.currencyName,
    pictureIds: product.pictures.map((pic) => pic[0].id),
  };

  client.interceptors.request.use(addBearerToken(data.accessToken));

  return client.put(`/v2/products/${data.slug}`, refreshData);
};
