import { DEPOP_API_ENDPOINT } from "../constants";
import { getProduct } from "../queries/getProduct";
import axios from "axios";

export type RefreshData = {
  slug: string;
  accessToken: string;
};

export const refresh = async (data: RefreshData) => {
  try {
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

    return axios.put(
      `${DEPOP_API_ENDPOINT}/v2/products/${data.slug}`,
      refreshData,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }
    );
  } catch (e: any) {
    console.log(`Failed to refresh product: ${(e as Error).message}`);
  }
};
