"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarifaHotel = void 0;
var TarifaHotel = /** @class */ (function () {
    function TarifaHotel(id, tipoHabitacion, precioPorNoche, moneda, vigenteDesde, vigenteHasta) {
        if (moneda === void 0) { moneda = "PEN"; }
        this.id = id;
        this.tipoHabitacion = tipoHabitacion;
        this.precioPorNoche = precioPorNoche;
        this.moneda = moneda;
        this.vigenteDesde = vigenteDesde;
        this.vigenteHasta = vigenteHasta;
    }
    TarifaHotel.prototype.esVigente = function (fecha) {
        var desdeOk = !this.vigenteDesde || fecha >= this.vigenteDesde;
        var hastaOk = !this.vigenteHasta || fecha <= this.vigenteHasta;
        return desdeOk && hastaOk;
    };
    return TarifaHotel;
}());
exports.TarifaHotel = TarifaHotel;
