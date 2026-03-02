import { HotelSystem } from "../HotelSystem";

import { FileHuespedRepository } from "../repositories/file/FileHuespedRepository";
import { FileHabitacionRepository } from "../repositories/file/FileHabitacionRepository";
import { FileReservaRepository } from "../repositories/file/FileReservaRepository";
import { FileEstadiaRepository } from "../repositories/file/FileEstadiaRepository";
import { FilePagoRepository } from "../repositories/file/FilePagoRepository";
import { FileTarifaRepository } from "../repositories/file/FileTarifaRepository";

import { HuespedService } from "./HuespedService";
import { HabitacionService } from "./HabitacionService";
import { ReservaService } from "./ReservaService";
import { EstadiaService } from "./EstadiaService";
import { PagoService } from "./PagoService";
import { TarifaService } from "./TarifaService";

export function buildHotelSystem(): HotelSystem {
  const hotel = new HotelSystem(
    new HuespedService(new FileHuespedRepository()),
    new HabitacionService(new FileHabitacionRepository()),
    new ReservaService(new FileReservaRepository()),
    new EstadiaService(new FileEstadiaRepository()),
    new PagoService(new FilePagoRepository()),
    new TarifaService(new FileTarifaRepository())
  );

  return hotel;
}