"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaqueteTuristico = void 0;
var PaqueteTuristico = /** @class */ (function () {
    function PaqueteTuristico(id, nombre, descripcion, precio, moneda, activo) {
        if (moneda === void 0) { moneda = "PEN"; }
        if (activo === void 0) { activo = true; }
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.moneda = moneda;
        this.activo = activo;
    }
    return PaqueteTuristico;
}());
exports.PaqueteTuristico = PaqueteTuristico;
