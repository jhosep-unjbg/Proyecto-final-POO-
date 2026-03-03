"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagoService = void 0;
var PagoService = /** @class */ (function () {
    function PagoService(repo) {
        this.repo = repo;
    }
    PagoService.prototype.crear = function (data) {
        // validaciones mínimas (ajusta a tu modelo Pago)
        if (data.monto == null)
            throw new Error("Monto requerido");
        if (data.reservaId == null)
            throw new Error("Reserva requerida");
        return this.repo.create(data);
    };
    PagoService.prototype.obtenerPorId = function (id) {
        return this.repo.findById(id);
    };
    PagoService.prototype.listarPorReserva = function (reservaId) {
        return this.repo.findByReserva(reservaId);
    };
    return PagoService;
}());
exports.PagoService = PagoService;
