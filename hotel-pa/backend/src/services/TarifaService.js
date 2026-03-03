"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarifaService = void 0;
var TarifaService = /** @class */ (function () {
    function TarifaService(repo) {
        this.repo = repo;
    }
    TarifaService.prototype.crear = function (data) {
        if (data.tipoHabitacion == null)
            throw new Error("TipoHabitacion requerido");
        if (data.precioPorNoche == null)
            throw new Error("Precio por noche requerido");
        if (Number(data.precioPorNoche) <= 0)
            throw new Error("Precio por noche debe ser > 0");
        // Evitar duplicar tarifas por tipo
        var existente = this.repo.findByTipo(data.tipoHabitacion);
        if (existente) {
            throw new Error("Ya existe tarifa para el tipo ".concat(data.tipoHabitacion));
        }
        return this.repo.create(data);
    };
    TarifaService.prototype.obtenerPorTipo = function (tipo) {
        return this.repo.findByTipo(tipo);
    };
    TarifaService.prototype.listar = function () {
        return this.repo.findAll();
    };
    TarifaService.prototype.actualizar = function (id, precioPorNoche) {
        var tarifa = this.repo.findById(id);
        if (!tarifa)
            throw new Error("Tarifa no encontrada");
        if (precioPorNoche <= 0)
            throw new Error("Precio por noche debe ser > 0");
        tarifa.precioPorNoche = precioPorNoche;
        return this.repo.update(tarifa);
    };
    return TarifaService;
}());
exports.TarifaService = TarifaService;
