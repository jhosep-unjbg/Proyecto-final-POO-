"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileDb_1 = require("./repositories/file/FileDb");
var db = new FileDb_1.FileDb();
var hotel = db.hotelSystem;
var huesped = hotel.registrarHuesped({
    nombres: "Juan",
    apellidos: "Perez",
    dni: "12345678",
    telefono: "999888777",
    email: "juan@mail.com",
});
console.log("✅ Huésped creado:", huesped);
