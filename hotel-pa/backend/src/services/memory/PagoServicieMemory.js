"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagoServiceMemory = void 0;
var Pago_1 = require("../../models/Pago");
var _utils_1 = require("./_utils");
var PagoServiceMemory = /** @class */ (function () {
    function PagoServiceMemory() {
        this.data = [];
        this.idCounter = { value: 0 };
    }
    PagoServiceMemory.prototype.crear = function (dto) {
        var _a, _b;
        if (!dto.reservaId)
            throw new Error("reservaId es requerido");
        if (dto.monto <= 0)
            throw new Error("monto debe ser > 0");
        if (!dto.metodo)
            throw new Error("metodo es requerido");
        var entity = new Pago_1.Pago((0, _utils_1.nextId)(this.idCounter), dto.reservaId, dto.monto, dto.metodo, (_a = dto.fecha) !== null && _a !== void 0 ? _a : new Date(), (_b = dto.moneda) !== null && _b !== void 0 ? _b : "PEN", dto.referencia);
        this.data.push(entity);
        return entity;
    };
    PagoServiceMemory.prototype.obtenerPorId = function (id) {
        var _a;
        return (_a = this.data.find(function (p) { return p.id === id; })) !== null && _a !== void 0 ? _a : null;
    };
    PagoServiceMemory.prototype.listarPorReserva = function (reservaId) {
        return this.data.filter(function (p) { return p.reservaId === reservaId; });
    };
    return PagoServiceMemory;
}());
exports.PagoServiceMemory = PagoServiceMemory;
