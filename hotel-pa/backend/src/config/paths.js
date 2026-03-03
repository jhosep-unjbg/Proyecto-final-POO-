"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = void 0;
var path_1 = __importDefault(require("path"));
exports.paths = {
    huespedes: path_1.default.join(process.cwd(), "data", "huespedes.txt"),
    habitaciones: path_1.default.join(process.cwd(), "data", "habitaciones.txt"),
    reservas: path_1.default.join(process.cwd(), "data", "reservas.txt"),
    estadias: path_1.default.join(process.cwd(), "data", "estadias.txt"),
    facturas: path_1.default.join(process.cwd(), "data", "facturas.txt"),
    pagos: path_1.default.join(process.cwd(), "data", "pagos.txt"),
    cambiosPrecio: path_1.default.join(process.cwd(), "data", "cambios_precio.txt"),
};
