export class Pago {
    constructor(
        private monto: number,
        private fecha: Date,
        private metodo: string
    ) {}

    getMonto(): number {
        return this.monto;
    }
}
