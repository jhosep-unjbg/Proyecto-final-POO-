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
exports.HuespedServiceMemory = void 0;
var Huesped_1 = require("../../models/Huesped");
var _utils_1 = require("./_utils");
var HuespedServiceMemory = /** @class */ (function () {
    function HuespedServiceMemory() {
        this.data = [];
        this.idCounter = { value: 0 };
    }
    HuespedServiceMemory.prototype.crear = function (dto) {
        var _a, _b, _c, _d;
        // Validaciones básicas
        if (!((_a = dto.nombres) === null || _a === void 0 ? void 0 : _a.trim()))
            throw new Error("nombres es requerido");
        if (!((_b = dto.apellidos) === null || _b === void 0 ? void 0 : _b.trim()))
            throw new Error("apellidos es requerido");
        if (!((_c = dto.dni) === null || _c === void 0 ? void 0 : _c.trim()))
            throw new Error("dni es requerido");
        if (!((_d = dto.telefono) === null || _d === void 0 ? void 0 : _d.trim()))
            throw new Error("telefono es requerido");
        // dni único (regla común)
        var existe = this.data.some(function (h) { return h.dni === dto.dni; });
        if (existe)
            throw new Error("Ya existe un huésped con ese DNI.");
        var entity = new Huesped_1.Huesped((0, _utils_1.nextId)(this.idCounter), dto.nombres, dto.apellidos, dto.dni, dto.telefono, dto.email);
        this.data.push(entity);
        return entity;
    };
    HuespedServiceMemory.prototype.obtenerPorId = function (id) {
        var _a;
        return (_a = this.data.find(function (h) { return h.id === id; })) !== null && _a !== void 0 ? _a : null;
    };
    HuespedServiceMemory.prototype.listar = function () {
        return __spreadArray([], this.data, true);
    };
    HuespedServiceMemory.prototype.buscar = function (filtro) {
        var _a, _b, _c, _d;
        var nombres = (_a = filtro.nombres) !== null && _a !== void 0 ? _a : "";
        var apellidos = (_b = filtro.apellidos) !== null && _b !== void 0 ? _b : "";
        var dni = (_c = filtro.dni) !== null && _c !== void 0 ? _c : "";
        var telefono = (_d = filtro.telefono) !== null && _d !== void 0 ? _d : "";
        return this.data.filter(function (h) {
            return ((0, _utils_1.includesNormalized)(h.nombres, nombres) &&
                (0, _utils_1.includesNormalized)(h.apellidos, apellidos) &&
                (0, _utils_1.includesNormalized)(h.dni, dni) &&
                (0, _utils_1.includesNormalized)(h.telefono, telefono));
        });
    };
    HuespedServiceMemory.prototype.actualizar = function (id, dto) {
        var h = this.obtenerPorId(id);
        if (!h)
            return null;
        // si cambia DNI, validar único
        if (dto.dni && dto.dni !== h.dni) {
            var existe = this.data.some(function (x) { return x.dni === dto.dni; });
            if (existe)
                throw new Error("Ya existe un huésped con ese DNI.");
        }
        if (dto.nombres !== undefined)
            h.nombres = dto.nombres;
        if (dto.apellidos !== undefined)
            h.apellidos = dto.apellidos;
        if (dto.dni !== undefined)
            h.dni = dto.dni;
        if (dto.telefono !== undefined)
            h.telefono = dto.telefono;
        if (dto.email !== undefined)
            h.email = dto.email;
        return h;
    };
    HuespedServiceMemory.prototype.eliminar = function (id) {
        var idx = this.data.findIndex(function (h) { return h.id === id; });
        if (idx === -1)
            return false;
        this.data.splice(idx, 1);
        return true;
    };
    return HuespedServiceMemory;
}());
exports.HuespedServiceMemory = HuespedServiceMemory;
