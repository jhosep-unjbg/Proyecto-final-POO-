import { HuespedService } from "../../services/HuespedService";
import { HabitacionService } from "../../services/HabitacionService";
import { ReservaService } from "../../services/ReservaService";

import { FileHuespedRepository } from "./FileHuespedRepository";
import { FileHabitacionRepository } from "./FileHabitacionRepository";
import { FileReservaRepository } from "./FileReservaRepository";

export class FileDb {
  // Repositories
  private readonly huespedRepo = new FileHuespedRepository();
  private readonly habitacionRepo = new FileHabitacionRepository();
  private readonly reservaRepo = new FileReservaRepository();

  // Services
  public readonly huespedService = new HuespedService(this.huespedRepo);

  public readonly habitacionService = new HabitacionService(
    this.habitacionRepo
  );

  public readonly reservaService = new ReservaService(
    this.reservaRepo,
    this.habitacionRepo,
    this.huespedRepo
  );
}