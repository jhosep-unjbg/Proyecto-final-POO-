"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pago = void 0;
var Pago = /** @class */ (function () {
    function Pago(id, reservaId, monto, metodo, fecha, moneda, referencia // num operación / voucher
    ) {
        if (fecha === void 0) { fecha = new Date(); }
        if (moneda === void 0) { moneda = "PEN"; }
        this.id = id;
        this.reservaId = reservaId;
        this.monto = monto;
        this.metodo = metodo;
        this.fecha = fecha;
        this.moneda = moneda;
        this.referencia = referencia;
    }
    return Pago;
}());
exports.Pago = Pago;
