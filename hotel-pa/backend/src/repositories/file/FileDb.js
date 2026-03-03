"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDb = void 0;
var HotelSystem_1 = require("../../HotelSystem");
// Services
var HuespedService_1 = require("../../services/HuespedService");
var HabitacionService_1 = require("../../services/HabitacionService");
var ReservaService_1 = require("../../services/ReservaService");
var EstadiaService_1 = require("../../services/EstadiaService");
var PagoService_1 = require("../../services/PagoService");
var TarifaService_1 = require("../../services/TarifaService");
// File repositories (core)
var FileHuespedRepository_1 = require("./FileHuespedRepository");
var FileHabitacionRepository_1 = require("./FileHabitacionRepository");
var FileReservaRepository_1 = require("./FileReservaRepository");
var FilePagoRepository_1 = require("./FilePagoRepository");
var FileTarifaRepository_1 = require("./FileTarifaRepository");
// ✅ OJO: este import lo vamos a ajustar abajo
var FileEstadiaRepository_1 = require("./FileEstadiaRepository");
var FileDb = /** @class */ (function () {
    function FileDb() {
        // repos
        this.huespedRepo = new FileHuespedRepository_1.FileHuespedRepository();
        this.habitacionRepo = new FileHabitacionRepository_1.FileHabitacionRepository();
        this.reservaRepo = new FileReservaRepository_1.FileReservaRepository();
        this.estadiaRepo = new FileEstadiaRepository_1.FileEstadiaRepository();
        this.pagoRepo = new FilePagoRepository_1.FilePagoRepository();
        this.tarifaRepo = new FileTarifaRepository_1.FileTarifaRepository();
        // services (según tu ejemplo, cada service recibe 1 repo)
        this.huespedService = new HuespedService_1.HuespedService(this.huespedRepo);
        this.habitacionService = new HabitacionService_1.HabitacionService(this.habitacionRepo);
        this.reservaService = new ReservaService_1.ReservaService(this.reservaRepo);
        this.estadiaService = new EstadiaService_1.EstadiaService(this.estadiaRepo);
        this.pagoService = new PagoService_1.PagoService(this.pagoRepo);
        this.tarifaService = new TarifaService_1.TarifaService(this.tarifaRepo);
        this.hotelSystem = new HotelSystem_1.HotelSystem(this.huespedService, this.habitacionService, this.reservaService, this.estadiaService, this.pagoService, this.tarifaService);
    }
    return FileDb;
}());
exports.FileDb = FileDb;
