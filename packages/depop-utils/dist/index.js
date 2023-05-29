"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShopProducts = exports.getProduct = exports.refresh = void 0;
var refreshProduct_1 = require("./requests/mutations/refreshProduct");
Object.defineProperty(exports, "refresh", { enumerable: true, get: function () { return refreshProduct_1.refresh; } });
var getProduct_1 = require("./requests/queries/getProduct");
Object.defineProperty(exports, "getProduct", { enumerable: true, get: function () { return getProduct_1.getProduct; } });
var getShopProducts_1 = require("./requests/queries/getShopProducts");
Object.defineProperty(exports, "getShopProducts", { enumerable: true, get: function () { return getShopProducts_1.getShopProducts; } });
