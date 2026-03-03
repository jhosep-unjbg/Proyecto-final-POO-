"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorialReserva = void 0;
var HistorialReserva = /** @class */ (function () {
    function HistorialReserva(id, reservaId, estadoAnterior, estadoNuevo, fechaCambio, motivo) {
        if (fechaCambio === void 0) { fechaCambio = new Date(); }
        this.id = id;
        this.reservaId = reservaId;
        this.estadoAnterior = estadoAnterior;
        this.estadoNuevo = estadoNuevo;
        this.fechaCambio = fechaCambio;
        this.motivo = motivo;
    }
    return HistorialReserva;
}());
exports.HistorialReserva = HistorialReserva;
