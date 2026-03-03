import path from "path";

export const paths = {
  huespedes: path.join(process.cwd(), "data", "huespedes.txt"),
  habitaciones: path.join(process.cwd(), "data", "habitaciones.txt"),
  reservas: path.join(process.cwd(), "data", "reservas.txt"),
  estadias: path.join(process.cwd(), "data", "estadias.txt"),
  facturas: path.join(process.cwd(), "data", "facturas.txt"),
  pagos: path.join(process.cwd(), "data", "pagos.txt"),
  cambiosPrecio: path.join(process.cwd(), "data", "cambios_precio.txt"),
};