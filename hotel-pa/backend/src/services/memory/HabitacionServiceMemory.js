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
exports.HabitacionServiceMemory = void 0;
var Habitacion_1 = require("../../models/Habitacion");
var _utils_1 = require("./_utils");
var HabitacionServiceMemory = /** @class */ (function () {
    function HabitacionServiceMemory() {
        this.data = [];
        this.idCounter = { value: 0 };
    }
    HabitacionServiceMemory.prototype.crear = function (dto) {
        var _a, _b;
        if (!((_a = dto.numero) === null || _a === void 0 ? void 0 : _a.trim()))
            throw new Error("numero es requerido");
        if (dto.piso === undefined || dto.piso === null)
            throw new Error("piso es requerido");
        if (!dto.tipo)
            throw new Error("tipo es requerido");
        if (!dto.capacidad || dto.capacidad <= 0)
            throw new Error("capacidad debe ser > 0");
        // numero único
        var existe = this.data.some(function (h) { return h.numero === dto.numero; });
        if (existe)
            throw new Error("Ya existe una habitación con ese número.");
        var entity = new Habitacion_1.Habitacion((0, _utils_1.nextId)(this.idCounter), dto.numero, dto.piso, dto.tipo, dto.capacidad, (_b = dto.activa) !== null && _b !== void 0 ? _b : true);
        this.data.push(entity);
        return entity;
    };
    HabitacionServiceMemory.prototype.obtenerPorId = function (id) {
        var _a;
        return (_a = this.data.find(function (h) { return h.id === id; })) !== null && _a !== void 0 ? _a : null;
    };
    HabitacionServiceMemory.prototype.listar = function () {
        return __spreadArray([], this.data, true);
    };
    HabitacionServiceMemory.prototype.actualizar = function (id, dto) {
        var h = this.obtenerPorId(id);
        if (!h)
            return null;
        if (dto.numero !== undefined && dto.numero !== h.numero) {
            var existe = this.data.some(function (x) { return x.numero === dto.numero; });
            if (existe)
                throw new Error("Ya existe una habitación con ese número.");
            h.numero = dto.numero;
        }
        if (dto.piso !== undefined)
            h.piso = dto.piso;
        if (dto.tipo !== undefined)
            h.tipo = dto.tipo;
        if (dto.capacidad !== undefined) {
            if (dto.capacidad <= 0)
                throw new Error("capacidad debe ser > 0");
            h.capacidad = dto.capacidad;
        }
        if (dto.activa !== undefined)
            h.activa = dto.activa;
        return h;
    };
    HabitacionServiceMemory.prototype.eliminar = function (id) {
        var idx = this.data.findIndex(function (h) { return h.id === id; });
        if (idx === -1)
            return false;
        this.data.splice(idx, 1);
        return true;
    };
    return HabitacionServiceMemory;
}());
exports.HabitacionServiceMemory = HabitacionServiceMemory;
