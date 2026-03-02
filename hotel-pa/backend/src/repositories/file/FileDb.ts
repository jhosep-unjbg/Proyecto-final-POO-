import { HotelSystem } from "../../HotelSystem";

// Services
import { HuespedService } from "../../services/HuespedService";
import { HabitacionService } from "../../services/HabitacionService";
import { ReservaService } from "../../services/ReservaService";
import { EstadiaService } from "../../services/EstadiaService";
import { PagoService } from "../../services/PagoService";
import { TarifaService } from "../../services/TarifaService";

// File repositories (core)
import { FileHuespedRepository } from "./FileHuespedRepository";
import { FileHabitacionRepository } from "./FileHabitacionRepository";
import { FileReservaRepository } from "./FileReservaRepository";
import { FilePagoRepository } from "./FilePagoRepository";
import { FileTarifaRepository } from "./FileTarifaRepository";

// ✅ OJO: este import lo vamos a ajustar abajo
import { FileEstadiaRepository } from "./FileEstadiaRepository";

export class FileDb {
  // repos
  public readonly huespedRepo = new FileHuespedRepository();
  public readonly habitacionRepo = new FileHabitacionRepository();
  public readonly reservaRepo = new FileReservaRepository();
  public readonly estadiaRepo = new FileEstadiaRepository();
  public readonly pagoRepo = new FilePagoRepository();
  public readonly tarifaRepo = new FileTarifaRepository();

  // services (según tu ejemplo, cada service recibe 1 repo)
  public readonly huespedService = new HuespedService(this.huespedRepo);
  public readonly habitacionService = new HabitacionService(this.habitacionRepo);
  public readonly reservaService = new ReservaService(this.reservaRepo);
  public readonly estadiaService = new EstadiaService(this.estadiaRepo);
  public readonly pagoService = new PagoService(this.pagoRepo);
  public readonly tarifaService = new TarifaService(this.tarifaRepo);

 public readonly hotelSystem = new HotelSystem(
    this.huespedService,
    this.habitacionService,
    this.reservaService,
    this.estadiaService,
    this.pagoService,
    this.tarifaService
  );
}