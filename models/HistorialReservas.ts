export class HistorialReserva {
    private registros: string[] = [];

    agregarRegistro(mensaje: string): void {
        this.registros.push(`${new Date().toISOString()} - ${mensaje}`);
    }

    obtenerHistorial(): string[] {
        return this.registros;
    }
}
