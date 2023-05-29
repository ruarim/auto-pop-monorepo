"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShopProducts = void 0;
const client_1 = __importDefault(require("../../axios/client"));
const getShopPaginated = async (shopId, offsetId, products) => {
    const res = await client_1.default.get(`/v1/shop/${shopId}/products/?limit=1000&offset_id=${offsetId}`);
    const data = res.data;
    data.products.map((product) => products.push(product));
    if (!data.meta.end)
        return getShopPaginated(shopId, data.meta.last_offset_id, products);
    else
        return products;
};
const getShopProducts = async (shopId) => {
    let offsetId = "";
    const products = await getShopPaginated(shopId, offsetId, []);
    return products;
};
exports.getShopProducts = getShopProducts;
