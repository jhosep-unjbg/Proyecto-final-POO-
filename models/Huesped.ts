export class Huesped {
    constructor(
        private id: number,
        private nombre: string,
        private documento: string,
        private telefono: string
    ) {}

    getNombre(): string {
        return this.nombre;
    }
}
