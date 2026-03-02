"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TipoHabitacion_1 = require("../models/TipoHabitacion");
var TipoHabitacion_2 = require("../models/TipoHabitacion");
var router = (0, express_1.Router)();
var habitaciones = [];
var tiposHabitacion = [
    new TipoHabitacion_2.TipoHabitacion(1, "Doble", "Dos camas", 2),
    new TipoHabitacion_2.TipoHabitacion(2, "Suite", "Suite deluxe", 4)
];
// Crear Habitación
router.post("/", function (req, res) {
    var _a = req.body, numero = _a.numero, tipoId = _a.tipoId, precioPorNoche = _a.precioPorNoche;
    var tipo = tiposHabitacion.find(function (t) { return t.id === tipoId; });
    if (!tipo)
        return res.status(400).json({ mensaje: "Tipo no existe" });
    var nueva = new TipoHabitacion_1.Habitacion(numero, tipo, precioPorNoche);
    habitaciones.push(nueva);
    res.status(201).json(nueva);
});
// Listar
router.get("/", function (req, res) {
    res.json(habitaciones);
});
// Obtener por numero
router.get("/:numero", function (req, res) {
    var numero = Number(req.params.numero);
    var hab = habitaciones.find(function (h) { return h.numero === numero; });
    if (!hab)
        return res.status(404).json({ mensaje: "No encontrada" });
    res.json(hab);
});
// Actualizar
router.put("/:numero", function (req, res) {
    var _a;
    var numero = Number(req.params.numero);
    var hab = habitaciones.find(function (h) { return h.numero === numero; });
    if (!hab)
        return res.status(404).json({ mensaje: "No encontrada" });
    hab.precioPorNoche = (_a = req.body.precioPorNoche) !== null && _a !== void 0 ? _a : hab.precioPorNoche;
    res.json(hab);
});
// Eliminar
router.delete("/:numero", function (req, res) {
    var numero = Number(req.params.numero);
    var index = habitaciones.findIndex(function (h) { return h.numero === numero; });
    if (index === -1)
        return res.status(404).json({ mensaje: "No encontrada" });
    habitaciones.splice(index, 1);
    res.json({ mensaje: "Eliminada" });
});
exports.default = router;
