"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagoService = void 0;
var PagoService = /** @class */ (function () {
    function PagoService(repo) {
        this.repo = repo;
    }
    PagoService.prototype.crear = function (data) {
        if (data.monto <= 0)
            throw new Error("Monto invalido");
        return this.repo.create(data);
    };
    PagoService.prototype.listarPorReserva = function (reservaId) {
        return this.repo.findByReserva(reservaId);
    };
    return PagoService;
}());
exports.PagoService = PagoService;
