import { CambioPrecioHabitacion } from "../../models/CambioPrecioHabitacion";
import { JsonRepository } from "./JsonRepository";

export class FileCambioPrecioHabitacionRepository extends JsonRepository<CambioPrecioHabitacion> {
  constructor() {
    super("cambios_precio_habitacion.json");
  }

  findByHabitacionId(habitacionId: number): CambioPrecioHabitacion[] {
    return this.findAll().filter((cambio) => cambio.habitacionId === habitacionId);
  }
}
