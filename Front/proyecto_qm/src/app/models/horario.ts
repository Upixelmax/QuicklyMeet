export class Horario {
    _id?: number;
    fecha: string;
    hora: string;
    estado: string;
    idUser: string | null;



    constructor(fecha: string, hora: string, estado: string, idUser: string){
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
        this.idUser = idUser
    }
}