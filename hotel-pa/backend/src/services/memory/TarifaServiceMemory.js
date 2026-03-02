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
exports.TarifaServiceMemory = void 0;
var TarifaHotel_1 = require("../../models/TarifaHotel");
var _utils_1 = require("./_utils");
var TarifaServiceMemory = /** @class */ (function () {
    function TarifaServiceMemory() {
        this.data = [];
        this.idCounter = { value: 0 };
    }
    TarifaServiceMemory.prototype.crearOActualizar = function (dto) {
        var _a;
        if (!dto.tipoHabitacion)
            throw new Error("tipoHabitacion es requerido");
        if (dto.precioPorNoche <= 0)
            throw new Error("precioPorNoche debe ser > 0");
        // Regla: 1 tarifa “vigente” por tipo (la última creada reemplaza)
        // Mantener historial real lo haremos después con la tabla historial_tarifa.
        // Aquí simplemente guardamos una entrada nueva.
        var entity = new TarifaHotel_1.TarifaHotel((0, _utils_1.nextId)(this.idCounter), dto.tipoHabitacion, dto.precioPorNoche, (_a = dto.moneda) !== null && _a !== void 0 ? _a : "PEN", dto.vigenteDesde, dto.vigenteHasta);
        this.data.push(entity);
        return entity;
    };
    TarifaServiceMemory.prototype.obtenerVigente = function (tipo, fecha) {
        var _a;
        // última tarifa que sea vigente en fecha
        var candidatas = this.data
            .filter(function (t) { return t.tipoHabitacion === tipo && t.esVigente(fecha); })
            .sort(function (a, b) { var _a, _b, _c, _d; return ((_b = (_a = b.vigenteDesde) === null || _a === void 0 ? void 0 : _a.getTime()) !== null && _b !== void 0 ? _b : 0) - ((_d = (_c = a.vigenteDesde) === null || _c === void 0 ? void 0 : _c.getTime()) !== null && _d !== void 0 ? _d : 0); });
        return (_a = candidatas[0]) !== null && _a !== void 0 ? _a : null;
    };
    TarifaServiceMemory.prototype.listar = function () {
        return __spreadArray([], this.data, true);
    };
    return TarifaServiceMemory;
}());
exports.TarifaServiceMemory = TarifaServiceMemory;
