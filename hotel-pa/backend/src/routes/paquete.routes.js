"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PaqueteTuristico_1 = require("../models/PaqueteTuristico");
var router = (0, express_1.Router)();
var paquetes = [];
var reservas = [];
router.post("/", function (req, res) {
    var _a = req.body, id = _a.id, nombre = _a.nombre, reservasIds = _a.reservasIds;
    var reservasPaquete = reservas.filter(function (r) { return reservasIds.includes(r.id); });
    var paquete = new PaqueteTuristico_1.PaqueteTuristico(id, nombre, reservasPaquete);
    paquetes.push(paquete);
    res.status(201).json(paquete);
});
router.get("/", function (req, res) { return res.json(paquetes); });
router.get("/:id", function (req, res) {
    var id = Number(req.params.id);
    var p = paquetes.find(function (p) { return p.id === id; });
    if (!p)
        return res.status(404).json({ mensaje: "No encontrado" });
    res.json(p);
});
exports.default = router;
