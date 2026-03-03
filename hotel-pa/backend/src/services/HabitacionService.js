"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitacionService = void 0;
var EstadoHabitacion_1 = require("../models/enums/EstadoHabitacion");
var Habitacion_1 = require("../models/Habitacion");
var FileHabitacionRepository_1 = require("../repositories/file/FileHabitacionRepository");
var HabitacionService = /** @class */ (function () {
    function HabitacionService() {
        this.repository = new FileHabitacionRepository_1.FileHabitacionRepository();
    }
    HabitacionService.prototype.getAll = function () {
        return this.repository.findAll();
    };
    HabitacionService.prototype.getById = function (id) {
        return this.repository.findById(id);
    };
    HabitacionService.prototype.create = function (dto) {
        var all = this.repository.findAll();
        // Regla: numero único
        var existsNumero = all.some(function (h) { return h.numero.toLowerCase() === dto.numero.toLowerCase(); });
        if (existsNumero) {
            throw new Error("Ya existe una habitaci\u00F3n con n\u00FAmero: ".concat(dto.numero));
        }
        var newId = all.length > 0 ? Math.max.apply(Math, all.map(function (h) { return h.id; })) + 1 : 1;
        var nueva = new Habitacion_1.Habitacion(newId, dto.numero, dto.piso, dto.tipoHabitacionId, EstadoHabitacion_1.EstadoHabitacion.DISPONIBLE);
        this.repository.save(nueva);
        return nueva;
    };
    HabitacionService.prototype.update = function (id, dto) {
        var actual = this.repository.findById(id);
        if (!actual)
            throw new Error("Habitación no encontrada");
        // Si cambia numero, validar unicidad
        if (dto.numero && dto.numero.toLowerCase() !== actual.numero.toLowerCase()) {
            var all = this.repository.findAll();
            var existsNumero = all.some(function (h) {
                return h.id !== id && h.numero.toLowerCase() === dto.numero.toLowerCase();
            });
            if (existsNumero)
                throw new Error("Ya existe una habitaci\u00F3n con n\u00FAmero: ".concat(dto.numero));
        }
        var actualizado = __assign(__assign({}, actual), dto);
        this.repository.update(actualizado);
        return actualizado;
    };
    HabitacionService.prototype.delete = function (id) {
        // Regla opcional: no permitir borrar si está ocupada
        var h = this.repository.findById(id);
        if (!h)
            return false;
        if (h.estado === EstadoHabitacion_1.EstadoHabitacion.OCUPADA) {
            throw new Error("No se puede eliminar una habitación OCUPADA");
        }
        return this.repository.delete(id);
    };
    // --- Reglas de negocio ---
    HabitacionService.prototype.changeEstado = function (id, nuevoEstado) {
        var h = this.repository.findById(id);
        if (!h)
            throw new Error("Habitación no encontrada");
        // Regla: ejemplo de transición (ajústala a tu lógica)
        // No permitir pasar a DISPONIBLE si está OCUPADA (debe pasar por LIMPIEZA, por ejemplo)
        if (h.estado === EstadoHabitacion_1.EstadoHabitacion.OCUPADA && nuevoEstado === EstadoHabitacion_1.EstadoHabitacion.DISPONIBLE) {
            throw new Error("No puedes pasar de OCUPADA a DISPONIBLE directamente. Pasa por LIMPIEZA.");
        }
        var actualizado = __assign(__assign({}, h), { estado: nuevoEstado });
        this.repository.update(actualizado);
        return actualizado;
    };
    // Habitaciones disponibles (por tipo opcional)
    HabitacionService.prototype.getDisponibles = function (tipoHabitacionId) {
        return this.repository.findAll().filter(function (h) {
            var okEstado = h.estado === EstadoHabitacion_1.EstadoHabitacion.DISPONIBLE;
            var okTipo = tipoHabitacionId ? h.tipoHabitacionId === tipoHabitacionId : true;
            return okEstado && okTipo;
        });
    };
    // Útil para reservas: verifica si una habitación está “reservable”
    HabitacionService.prototype.isReservable = function (id) {
        var h = this.repository.findById(id);
        if (!h)
            return false;
        return h.estado === EstadoHabitacion_1.EstadoHabitacion.DISPONIBLE;
    };
    return HabitacionService;
}());
exports.HabitacionService = HabitacionService;
