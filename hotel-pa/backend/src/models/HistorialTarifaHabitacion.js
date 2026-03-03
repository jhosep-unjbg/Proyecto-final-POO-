"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorialTarifaHabitacion = void 0;
var MotivoCambioTarifa_1 = require("./MotivoCambioTarifa");
var HistorialTarifaHabitacion = /** @class */ (function () {
    function HistorialTarifaHabitacion(id, tipoHabitacion, precioAnterior, precioNuevo, moneda, fechaCambio, usuarioId, // opcional: quién cambió el precio
    motivo, observacion) {
        if (moneda === void 0) { moneda = "PEN"; }
        if (fechaCambio === void 0) { fechaCambio = new Date(); }
        if (motivo === void 0) { motivo = MotivoCambioTarifa_1.MotivoCambioTarifa.AJUSTE_MANUAL; }
        this.id = id;
        this.tipoHabitacion = tipoHabitacion;
        this.precioAnterior = precioAnterior;
        this.precioNuevo = precioNuevo;
        this.moneda = moneda;
        this.fechaCambio = fechaCambio;
        this.usuarioId = usuarioId;
        this.motivo = motivo;
        this.observacion = observacion;
    }
    HistorialTarifaHabitacion.prototype.getDiferencia = function () {
        return this.precioNuevo - this.precioAnterior;
    };
    HistorialTarifaHabitacion.prototype.getPorcentajeCambio = function () {
        if (this.precioAnterior === 0)
            return 0;
        return (this.getDiferencia() / this.precioAnterior) * 100;
    };
    return HistorialTarifaHabitacion;
}());
exports.HistorialTarifaHabitacion = HistorialTarifaHabitacion;
