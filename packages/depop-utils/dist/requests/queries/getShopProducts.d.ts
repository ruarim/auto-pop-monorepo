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
};
export type ProductsResponse = {
    meta: {
        limit: number;
        last_offset_id: string;
        end: boolean;
    };
    products: Product[];
};
export declare const getShopProducts: (shopId: number) => Promise<Product[]>;
