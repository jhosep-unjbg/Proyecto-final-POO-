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
exports.EstadiaServiceMemory = void 0;
var Estadia_1 = require("../../models/Estadia");
var _utils_1 = require("./_utils");
var EstadiaServiceMemory = /** @class */ (function () {
    function EstadiaServiceMemory() {
        this.data = [];
        this.idCounter = { value: 0 };
    }
    EstadiaServiceMemory.prototype.crearDesdeReserva = function (reservaId, checkIn) {
        // Regla: 1 estadía activa por reserva
        var existeActiva = this.data.some(function (e) { return e.reservaId === reservaId && e.estado === "ACTIVA"; });
        if (existeActiva)
            throw new Error("Ya existe una estadía activa para esa reserva.");
        var entity = new Estadia_1.Estadia((0, _utils_1.nextId)(this.idCounter), reservaId, checkIn);
        this.data.push(entity);
        return entity;
    };
    EstadiaServiceMemory.prototype.obtenerPorId = function (id) {
        var _a;
        return (_a = this.data.find(function (e) { return e.id === id; })) !== null && _a !== void 0 ? _a : null;
    };
    EstadiaServiceMemory.prototype.listar = function () {
        return __spreadArray([], this.data, true);
    };
    EstadiaServiceMemory.prototype.finalizar = function (id, checkOut) {
        var e = this.obtenerPorId(id);
        if (!e)
            throw new Error("Estadía no encontrada.");
        e.finalizar(checkOut);
        return e;
    };
    return EstadiaServiceMemory;
}());
exports.EstadiaServiceMemory = EstadiaServiceMemory;
