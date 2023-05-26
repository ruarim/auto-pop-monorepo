"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = void 0;
const client_1 = __importStar(require("../../axios/client"));
const getProduct_1 = require("../queries/getProduct");
const refresh = async (data) => {
    var _a;
    const productData = await (0, getProduct_1.getProduct)(data.slug, data.accessToken);
    const product = productData.data;
    const refreshData = Object.assign(Object.assign({}, product), { priceAmount: product.price.priceAmount, nationalShippingCost: product.price.nationalShippingCost, internationalShippingCost: (_a = product.price) === null || _a === void 0 ? void 0 : _a.internationalShippingCost, priceCurrency: product.price.currencyName, pictureIds: product.pictures.map((pic) => pic[0].id) });
    client_1.default.interceptors.request.use((0, client_1.addBearerToken)(data.accessToken));
    return client_1.default.put(`/v2/products/${data.slug}`, refreshData);
};
exports.refresh = refresh;
