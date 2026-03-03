import { JsonRepository } from "./JsonRepository";
import { Recepcionista } from "../../models/Recepcionista";

export class RecepcionistaRepository extends JsonRepository<Recepcionista> {
  constructor() {
    super("recepcionistas.json");
  }
}