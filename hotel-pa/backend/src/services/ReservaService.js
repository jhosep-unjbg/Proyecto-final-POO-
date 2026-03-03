"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaService = void 0;
var ReservaHotel_1 = require("../models/ReservaHotel");
var EstadoReserva_1 = require("../models/EstadoReserva");
var ReservaService = /** @class */ (function () {
    function ReservaService(repo) {
        this.repo = repo;
    }
    ReservaService.prototype.crear = function (data) {
        if (data.fechaFin <= data.fechaInicio) {
            throw new Error("fechaFin debe ser mayor");
        }
        var reserva = new ReservaHotel_1.ReservaHotel(0, data.huespedId, data.habitacionId, data.fechaInicio, data.fechaFin, EstadoReserva_1.EstadoReserva.PENDIENTE, undefined, data.observaciones);
        return this.repo.create(reserva);
    };
    ReservaService.prototype.confirmar = function (id) {
        var reserva = this.repo.findById(id);
        if (!reserva)
            throw new Error("Reserva no encontrada");
        reserva.confirmar();
        return this.repo.update(reserva);
    };
    ReservaService.prototype.cancelar = function (id) {
        var reserva = this.repo.findById(id);
        if (!reserva)
            throw new Error("Reserva no encontrada");
        reserva.cancelar();
        return this.repo.update(reserva);
    };
    ReservaService.prototype.obtenerPorId = function (id) {
        return this.repo.findById(id);
    };
    return ReservaService;
}());
exports.ReservaService = ReservaService;
