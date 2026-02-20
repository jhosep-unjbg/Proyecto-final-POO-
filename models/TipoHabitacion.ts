export class TipoHabitacion {
    constructor(
        private id: number,
        private nombre: string,
        private capacidad: number,
        private descripcion: string
    ) {}

    getNombre(): string {
        return this.nombre;
    }

    getCapacidad(): number {
        return this.capacidad;
    }
}
