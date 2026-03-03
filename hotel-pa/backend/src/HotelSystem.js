"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelSystem = void 0;
var HotelSystem = /** @class */ (function () {
    function HotelSystem(huespedService, habitacionService, reservaService, estadiaService, pagoService, tarifaService) {
        this.huespedService = huespedService;
        this.habitacionService = habitacionService;
        this.reservaService = reservaService;
        this.estadiaService = estadiaService;
        this.pagoService = pagoService;
        this.tarifaService = tarifaService;
    }
    // ===== HUÉSPED =====
    HotelSystem.prototype.registrarHuesped = function (data) {
        return this.huespedService.crear(data);
    };
    HotelSystem.prototype.buscarHuesped = function (filtro) {
        return this.huespedService.buscar(filtro);
    };
    // ===== HABITACIÓN =====
    HotelSystem.prototype.registrarHabitacion = function (data) {
        return this.habitacionService.crear(data);
    };
    HotelSystem.prototype.listarHabitaciones = function () {
        return this.habitacionService.listar();
    };
    // ===== TARIFAS =====
    HotelSystem.prototype.crearTarifa = function (data) {
        return this.tarifaService.crear(data);
    };
    HotelSystem.prototype.obtenerTarifaPorTipo = function (tipo) {
        return this.tarifaService.obtenerPorTipo(tipo);
    };
    HotelSystem.prototype.listarTarifas = function () {
        return this.tarifaService.listar();
    };
    // ===== RESERVA =====
    HotelSystem.prototype.crearReserva = function (data) {
        return this.reservaService.crear(data);
    };
    HotelSystem.prototype.confirmarReserva = function (id) {
        return this.reservaService.confirmar(id);
    };
    HotelSystem.prototype.cancelarReserva = function (id) {
        return this.reservaService.cancelar(id);
    };
    HotelSystem.prototype.obtenerReservaPorId = function (id) {
        return this.reservaService.obtenerPorId(id);
    };
    // ===== ESTADÍA =====
    HotelSystem.prototype.checkIn = function (reservaId) {
        return this.estadiaService.checkIn(reservaId);
    };
    HotelSystem.prototype.checkOut = function (estadiaId) {
        return this.estadiaService.checkOut(estadiaId);
    };
    // ===== PAGO =====
    HotelSystem.prototype.registrarPago = function (data) {
        return this.pagoService.crear(data);
    };
    HotelSystem.prototype.listarPagosPorReserva = function (reservaId) {
        return this.pagoService.listarPorReserva(reservaId);
    };
    return HotelSystem;
}());
exports.HotelSystem = HotelSystem;
