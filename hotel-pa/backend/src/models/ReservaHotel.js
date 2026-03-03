"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaHotel = void 0;
var EstadoReserva_1 = require("./EstadoReserva");
var ReservaHotel = /** @class */ (function () {
    function ReservaHotel(id, huespedId, habitacionId, fechaInicio, fechaFin, estado, paqueteTuristicoId, observaciones) {
        if (estado === void 0) { estado = EstadoReserva_1.EstadoReserva.PENDIENTE; }
        this.id = id;
        this.huespedId = huespedId;
        this.habitacionId = habitacionId;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado;
        this.paqueteTuristicoId = paqueteTuristicoId;
        this.observaciones = observaciones;
    }
    ReservaHotel.prototype.getNoches = function () {
        // noches = diferencia de días entre inicio y fin
        var ms = this.fechaFin.getTime() - this.fechaInicio.getTime();
        var dias = Math.ceil(ms / (1000 * 60 * 60 * 24));
        return Math.max(dias, 0);
    };
    ReservaHotel.prototype.confirmar = function () {
        this.estado = EstadoReserva_1.EstadoReserva.CONFIRMADA;
    };
    ReservaHotel.prototype.cancelar = function () {
        this.estado = EstadoReserva_1.EstadoReserva.CANCELADA;
    };
    return ReservaHotel;
}());
exports.ReservaHotel = ReservaHotel;
