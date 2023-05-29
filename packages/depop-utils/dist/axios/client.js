"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBearerToken = void 0;
const axios_1 = __importDefault(require("axios"));
const DEPOP_API_ENDPOINT = "https://webapi.depop.com/api";
const client = axios_1.default.create({
    baseURL: DEPOP_API_ENDPOINT,
});
const addBearerToken = (accessToken) => {
    return (config) => {
        config.headers = Object.assign(Object.assign({}, config.headers), { Authorization: `Bearer ${accessToken}` });
        return config;
    };
};
exports.addBearerToken = addBearerToken;
exports.default = client;
