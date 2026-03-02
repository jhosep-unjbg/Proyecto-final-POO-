"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var Huesped_1 = require("./models/Huesped");
var Habitacion_1 = require("./models/Habitacion");
var TipoHabitacion_1 = require("./models/enums/TipoHabitacion");
var ReservaHotel_1 = require("./models/ReservaHotel");
var PaqueteTuristico_1 = require("./models/PaqueteTuristico");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "tu_password",
    database: "hotel_pa",
    synchronize: true, // sincroniza tablas automáticamente (solo dev)
    logging: false,
    entities: [Huesped_1.Huesped, Habitacion_1.Habitacion, TipoHabitacion_1.TipoHabitacion, ReservaHotel_1.ReservaHotel, PaqueteTuristico_1.PaqueteTuristico],
    migrations: [],
    subscribers: [],
});
