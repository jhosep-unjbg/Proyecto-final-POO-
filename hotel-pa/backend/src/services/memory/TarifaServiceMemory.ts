import { TarifaHotel } from "../../models/TarifaHotel";
import { TipoHabitacion } from "../../models/enums/TipoHabitacion";
import { ITarifaService } from "../contracts/TarifaService";
import { nextId } from "./_utils";

export class TarifaServiceMemory implements ITarifaService {
  private readonly data: TarifaHotel[] = [];
  private readonly idCounter = { value: 0 };

  crearOActualizar(dto: Omit<TarifaHotel, "id">): TarifaHotel {
    if (!dto.tipoHabitacion) throw new Error("tipoHabitacion es requerido");
    if (dto.precioPorNoche <= 0) throw new Error("precioPorNoche debe ser > 0");

    // Regla: 1 tarifa “vigente” por tipo (la última creada reemplaza)
    // Mantener historial real lo haremos después con la tabla historial_tarifa.
    // Aquí simplemente guardamos una entrada nueva.
    const entity = new TarifaHotel(
      nextId(this.idCounter),
      dto.tipoHabitacion,
      dto.precioPorNoche,
      dto.moneda ?? "PEN",
      dto.vigenteDesde,
      dto.vigenteHasta
    );

    this.data.push(entity);
    return entity;
  }

  obtenerVigente(tipo: TipoHabitacion, fecha: Date): TarifaHotel | null {
    // última tarifa que sea vigente en fecha
    const candidatas = this.data
      .filter(t => t.tipoHabitacion === tipo && t.esVigente(fecha))
      .sort((a, b) => (b.vigenteDesde?.getTime() ?? 0) - (a.vigenteDesde?.getTime() ?? 0));

    return candidatas[0] ?? null;
  }

  listar(): TarifaHotel[] {
    return [...this.data];
  }
}