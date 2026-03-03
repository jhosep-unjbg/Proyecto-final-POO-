"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ReservaHotel_1 = require("../models/ReservaHotel");
var EstadoReserva_1 = require("../models/EstadoReserva");
var router = (0, express_1.Router)();
var reservas = [];
var huespedes = []; // Para simular base de datos
var habitaciones = [];
router.post("/", function (req, res) {
    var _a = req.body, id = _a.id, huespedId = _a.huespedId, habitacionNumero = _a.habitacionNumero, fechaInicio = _a.fechaInicio, fechaFin = _a.fechaFin;
    var huesped = huespedes.find(function (h) { return h.id === huespedId; });
    var habitacion = habitaciones.find(function (h) { return h.numero === habitacionNumero; });
    if (!huesped || !habitacion)
        return res.status(400).json({ mensaje: "Datos inválidos" });
    var nueva = new ReservaHotel_1.ReservaHotel(id, huesped, habitacion, new Date(fechaInicio), new Date(fechaFin), EstadoReserva_1.EstadoReserva.PENDIENTE);
    reservas.push(nueva);
    habitacion.reservar();
    res.status(201).json(nueva);
});
router.get("/", function (req, res) { return res.json(reservas); });
router.get("/:id", function (req, res) {
    var id = Number(req.params.id);
    var r = reservas.find(function (r) { return r.id === id; });
    if (!r)
        return res.status(404).json({ mensaje: "No encontrada" });
    res.json(r);
});
exports.default = router;
