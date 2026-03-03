import { PaqueteTuristico } from "../../models/PaqueteTuristico";
import { JsonRepository } from "./JsonRepository";

export class FilePaqueteRepository extends JsonRepository<PaqueteTuristico> {
  constructor() {
    super("paquetes.json");
  }
}
