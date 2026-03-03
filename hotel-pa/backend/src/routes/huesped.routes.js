"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Huesped_1 = require("../models/Huesped");
var router = (0, express_1.Router)();
var huespedes = [];
// Crear Huesped
router.post("/", function (req, res) {
    var _a = req.body, id = _a.id, nombre = _a.nombre, email = _a.email, telefono = _a.telefono;
    var nuevo = new Huesped_1.Huesped(id, nombre, email, telefono);
    huespedes.push(nuevo);
    res.status(201).json(nuevo);
});
// Listar todos
router.get("/", function (req, res) {
    res.json(huespedes);
});
// Obtener por ID
router.get("/:id", function (req, res) {
    var id = Number(req.params.id);
    var encontrado = huespedes.find(function (h) { return h.id === id; });
    if (!encontrado)
        return res.status(404).json({ mensaje: "No encontrado" });
    res.json(encontrado);
});
// Actualizar
router.put("/:id", function (req, res) {
    var _a, _b, _c;
    var id = Number(req.params.id);
    var huesped = huespedes.find(function (h) { return h.id === id; });
    if (!huesped)
        return res.status(404).json({ mensaje: "No encontrado" });
    huesped.nombre = (_a = req.body.nombre) !== null && _a !== void 0 ? _a : huesped.nombre;
    huesped.email = (_b = req.body.email) !== null && _b !== void 0 ? _b : huesped.email;
    huesped.telefono = (_c = req.body.telefono) !== null && _c !== void 0 ? _c : huesped.telefono;
    res.json(huesped);
});
// Eliminar
router.delete("/:id", function (req, res) {
    var id = Number(req.params.id);
    var index = huespedes.findIndex(function (h) { return h.id === id; });
    if (index === -1)
        return res.status(404).json({ mensaje: "No encontrado" });
    huespedes.splice(index, 1);
    res.json({ mensaje: "Eliminado" });
});
exports.default = router;
