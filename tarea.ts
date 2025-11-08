import { Dificultad, Estado } from "./types.js";
//agregar id con uuid
export interface Tarea {
    nombre: string;
    descripcion: string;
    dificultad: Dificultad;
    estado: Estado;
    fechaCreacion: Date;
    fechaEdicion: Date;
    fechaVencimiento: string;
    id: string;
}