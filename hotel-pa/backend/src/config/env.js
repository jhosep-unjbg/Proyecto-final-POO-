"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.env = {
    PORT: Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000),
    DB_ENABLED: ((_b = process.env.DB_ENABLED) !== null && _b !== void 0 ? _b : "false") === "true",
    STORAGE: (_c = process.env.STORAGE) !== null && _c !== void 0 ? _c : "FILE",
};
