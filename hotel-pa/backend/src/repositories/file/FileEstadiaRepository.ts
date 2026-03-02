import { JsonRepository } from "./JsonRepository";
import { Estadia } from "../../models/Estadia";

export class FileEstadiaRepository extends JsonRepository<Estadia> {
  constructor() {
    super("estadias.json");
  }

  private hydrate(e: Estadia): Estadia {
    return {
      ...e,
      fechaCheckIn: new Date((e as any).fechaCheckIn),
      fechaCheckOut: (e as any).fechaCheckOut ? new Date((e as any).fechaCheckOut) : null,
    };
  }

  override findAll(): Estadia[] {
    return super.findAll().map(e => this.hydrate(e));
  }

  override findById(id: number): Estadia | null {
    const e = super.findById(id);
    return e ? this.hydrate(e) : null;
  }
}