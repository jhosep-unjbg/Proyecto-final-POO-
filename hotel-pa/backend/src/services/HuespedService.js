"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HuespedService = void 0;
var HuespedService = /** @class */ (function () {
    function HuespedService(repo) {
        this.repo = repo;
    }
    HuespedService.prototype.crear = function (data) {
        if (!data.nombres)
            throw new Error("Nombres requeridos");
        if (!data.apellidos)
            throw new Error("Apellidos requeridos");
        if (!data.dni)
            throw new Error("DNI requerido");
        if (!data.telefono)
            throw new Error("Telefono requerido");
        return this.repo.create(data);
    };
    HuespedService.prototype.buscar = function (filtro) {
        return this.repo.search(filtro);
    };
    return HuespedService;
}());
exports.HuespedService = HuespedService;
