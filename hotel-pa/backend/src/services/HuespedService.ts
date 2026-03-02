import { Huesped } from "../models/Huesped";
import { IHuespedRepository } from "../repositories/interfaces/IHuespedRepository";

export type HuespedCreateInput = {
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  email?: string;
};

export type HuespedSearchFilter = Partial<{
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
}>;

function norm(s: string) {
  return s.trim().toLowerCase();
}
function includesNorm(value: string, q?: string) {
  if (q === undefined) return true;
  return norm(value).includes(norm(q));
}

export class HuespedService {
  constructor(private readonly repo: IHuespedRepository) {}

  // método "base"
  create(input: HuespedCreateInput) {
    const data: Omit<Huesped, "id"> = {
      nombre: input.nombres,
      apellido: input.apellidos,
      dni: input.dni,
      telefono: input.telefono,
      email: input.email ?? "",
    };

    return this.repo.create(data);
  }

  // ✅ Alias para tu HotelSystem (crear)
  crear(input: HuespedCreateInput) {
    return this.create(input);
  }

  // ✅ Para tu HotelSystem (buscar)
  buscar(filtro: HuespedSearchFilter): Huesped[] {
    const all = this.repo.findAll();

    return all.filter(h =>
      includesNorm(h.nombre, filtro.nombres) &&
      includesNorm(h.apellido, filtro.apellidos) &&
      includesNorm(h.dni, filtro.dni) &&
      includesNorm(h.telefono, filtro.telefono)
    );
  }
}