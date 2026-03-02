"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHotelSystem = buildHotelSystem;
var HotelSystem_1 = require("../HotelSystem");
var FileHuespedRepository_1 = require("../repositories/file/FileHuespedRepository");
var FileHabitacionRepository_1 = require("../repositories/file/FileHabitacionRepository");
var FileReservaRepository_1 = require("../repositories/file/FileReservaRepository");
var FileEstadiaRepository_1 = require("../repositories/file/FileEstadiaRepository");
var FilePagoRepository_1 = require("../repositories/file/FilePagoRepository");
var FileTarifaRepository_1 = require("../repositories/file/FileTarifaRepository");
var HuespedService_1 = require("./HuespedService");
var HabitacionService_1 = require("./HabitacionService");
var ReservaService_1 = require("./ReservaService");
var EstadiaService_1 = require("./EstadiaService");
var PagoService_1 = require("./PagoService");
var TarifaService_1 = require("./TarifaService");
function buildHotelSystem() {
    var hotel = new HotelSystem_1.HotelSystem(new HuespedService_1.HuespedService(new FileHuespedRepository_1.FileHuespedRepository()), new HabitacionService_1.HabitacionService(new FileHabitacionRepository_1.FileHabitacionRepository()), new ReservaService_1.ReservaService(new FileReservaRepository_1.FileReservaRepository()), new EstadiaService_1.EstadiaService(new FileEstadiaRepository_1.FileEstadiaRepository()), new PagoService_1.PagoService(new FilePagoRepository_1.FilePagoRepository()), new TarifaService_1.TarifaService(new FileTarifaRepository_1.FileTarifaRepository()));
    return hotel;
}
