"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estadia = void 0;
var Estadia = /** @class */ (function () {
    function Estadia(id, reservaId, checkIn, checkOut, estado) {
        if (estado === void 0) { estado = "ACTIVA"; }
        this.id = id;
        this.reservaId = reservaId;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.estado = estado;
    }
    Estadia.prototype.finalizar = function (checkOut) {
        if (checkOut === void 0) { checkOut = new Date(); }
        this.checkOut = checkOut;
        this.estado = "FINALIZADA";
    };
    return Estadia;
}());
exports.Estadia = Estadia;
