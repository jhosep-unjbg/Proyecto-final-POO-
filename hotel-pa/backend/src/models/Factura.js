"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factura = void 0;
var Factura = /** @class */ (function () {
    function Factura(id, reservaId, total, fecha) {
        if (fecha === void 0) { fecha = new Date(); }
        this.id = id;
        this.reservaId = reservaId;
        this.total = total;
        this.fecha = fecha;
    }
    return Factura;
}());
exports.Factura = Factura;
