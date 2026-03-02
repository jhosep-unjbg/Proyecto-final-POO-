import { JsonRepository } from "./JsonRepository";
import { Huesped } from "../../models/Huesped";
import { HuespedFiltro, IHuespedRepository } from "../interfaces/IHuespedRepository";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();

export class FileHuespedRepository
  extends JsonRepository<Huesped>
  implements IHuespedRepository
{
  constructor() {
    super("huespedes.json");
  }

  findByDni(dni: string): Huesped | null {
    const items = this.findAll();
    const d = norm(dni);
    return items.find(h => norm((h as any).dni ?? "") === d) ?? null;
  }

  search(filtro: HuespedFiltro): Huesped[] {
    const items = this.findAll();

    const tokens = [
      filtro.nombres,
      filtro.apellidos,
      filtro.dni,
      filtro.telefono
    ]
      .filter(Boolean)
      .map(x => norm(String(x)));

    if (tokens.length === 0) return items;

    return items.filter(h => {
      const hay = norm(
        `${(h as any).nombres ?? ""} ${(h as any).apellidos ?? ""} ${(h as any).dni ?? ""} ${(h as any).telefono ?? ""}`
      );
      return tokens.every(t => hay.includes(t));
    });
  }
}