"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Habitacion = void 0;
var Habitacion = /** @class */ (function () {
    function Habitacion(id, numero, piso, tipoHabitacionId, estado) {
        this.id = id;
        this.numero = numero;
        this.piso = piso;
        this.tipoHabitacionId = tipoHabitacionId;
        this.estado = estado;
    }
    return Habitacion;
}());
exports.Habitacion = Habitacion;
