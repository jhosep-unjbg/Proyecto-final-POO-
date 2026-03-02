"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaServiceMemory = void 0;
var ReservaHotel_1 = require("../../models/ReservaHotel");
var EstadoReserva_1 = require("../../models/EstadoReserva");
var _utils_1 = require("./_utils");
var ReservaServiceMemory = /** @class */ (function () {
    function ReservaServiceMemory() {
        this.data = [];
        this.idCounter = { value: 0 };
    }
    ReservaServiceMemory.prototype.crear = function (dto) {
        var _a;
        if (!dto.huespedId)
            throw new Error("huespedId es requerido");
        if (!dto.habitacionId)
            throw new Error("habitacionId es requerido");
        if (!dto.fechaInicio || !dto.fechaFin)
            throw new Error("fechaInicio y fechaFin son requeridas");
        if (dto.fechaFin <= dto.fechaInicio)
            throw new Error("fechaFin debe ser mayor que fechaInicio");
        var entity = new ReservaHotel_1.ReservaHotel((0, _utils_1.nextId)(this.idCounter), dto.huespedId, dto.habitacionId, dto.fechaInicio, dto.fechaFin, (_a = dto.estado) !== null && _a !== void 0 ? _a : EstadoReserva_1.EstadoReserva.PENDIENTE, dto.paqueteTuristicoId, dto.observaciones);
        this.data.push(entity);
        return entity;
    };
    ReservaServiceMemory.prototype.obtenerPorId = function (id) {
        var _a;
        return (_a = this.data.find(function (r) { return r.id === id; })) !== null && _a !== void 0 ? _a : null;
    };
    ReservaServiceMemory.prototype.listar = function () {
        return __spreadArray([], this.data, true);
    };
    ReservaServiceMemory.prototype.confirmar = function (id) {
        var r = this.obtenerPorId(id);
        if (!r)
            throw new Error("Reserva no encontrada.");
        r.confirmar();
        return r;
    };
    ReservaServiceMemory.prototype.cancelar = function (id, _motivo) {
        var r = this.obtenerPorId(id);
        if (!r)
            throw new Error("Reserva no encontrada.");
        r.cancelar();
        return r;
    };
    return ReservaServiceMemory;
}());
exports.ReservaServiceMemory = ReservaServiceMemory;
