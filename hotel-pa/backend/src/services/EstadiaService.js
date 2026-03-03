"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadiaService = void 0;
var Estadia_1 = require("../models/Estadia");
var EstadiaService = /** @class */ (function () {
    function EstadiaService(repo) {
        this.repo = repo;
    }
    EstadiaService.prototype.checkIn = function (reservaId) {
        var estadia = new Estadia_1.Estadia(0, reservaId, new Date());
        return this.repo.create(estadia);
    };
    EstadiaService.prototype.checkOut = function (id) {
        var estadia = this.repo.findById(id);
        if (!estadia)
            throw new Error("Estadia no encontrada");
        estadia.finalizar(new Date());
        return this.repo.update(estadia);
    };
    return EstadiaService;
}());
exports.EstadiaService = EstadiaService;
