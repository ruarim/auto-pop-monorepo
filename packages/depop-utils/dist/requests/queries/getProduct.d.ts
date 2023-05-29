import { Product } from "./getShopProducts";
type ProductResponse = {
    data: Product;
};
export declare const getProduct: (slug: string, accessToken: string) => Promise<ProductResponse>;
export {};
