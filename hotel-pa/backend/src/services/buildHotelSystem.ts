import { HotelSystem } from "../HotelSystem";

import { HuespedService } from "./HuespedService";
import { HabitacionService } from "./HabitacionService";
import { ReservaService } from "./ReservaService";
import { PagoService } from "./PagoService";

import { FileHuespedRepository } from "../repositories/file/FileHuespedRepository";
import { FileHabitacionRepository } from "../repositories/file/FileHabitacionRepository";
import { FileReservaRepository } from "../repositories/file/FileReservaRepository";
import { FilePagoRepository } from "../repositories/file/FilePagoRepository";

export function buildHotelSystem(): HotelSystem {
  const huespedRepo = new FileHuespedRepository();
  const habitacionRepo = new FileHabitacionRepository();
  const reservaRepo = new FileReservaRepository();
  const pagoRepo = new FilePagoRepository();

  const huespedService = new HuespedService(huespedRepo);
  const habitacionService = new HabitacionService(habitacionRepo);
  const reservaService = new ReservaService(reservaRepo, habitacionRepo, huespedRepo);
  const pagoService = new PagoService(pagoRepo);

  return new HotelSystem(huespedService, habitacionService, reservaService, pagoService);
}