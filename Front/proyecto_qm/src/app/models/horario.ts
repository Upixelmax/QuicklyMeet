export class Horario {
    _id?: number;
    fecha: string;
    hora: string;
    estado: string;



    constructor(fecha: string, hora: string, estado: string){
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
    }
}