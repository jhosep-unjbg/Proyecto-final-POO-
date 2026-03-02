"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : "127.0.0.1",
    port: Number((_b = process.env.DB_PORT) !== null && _b !== void 0 ? _b : 3306),
    username: (_c = process.env.DB_USER) !== null && _c !== void 0 ? _c : "root",
    password: (_d = process.env.DB_PASS) !== null && _d !== void 0 ? _d : "",
    database: (_e = process.env.DB_NAME) !== null && _e !== void 0 ? _e : "hotel_pa",
    synchronize: true, // desarrollo (luego se cambia a migrations)
    logging: false,
    entities: [], // luego pondrás tus entidades TypeORM aquí
});
