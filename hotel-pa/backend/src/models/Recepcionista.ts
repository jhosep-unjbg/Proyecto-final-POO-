import { Usuario } from "./Usuario";
import { Turno } from "./enums/Turno";

export interface Recepcionista {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  turno: Turno;
  activo: boolean;
  createdAt: string;
}