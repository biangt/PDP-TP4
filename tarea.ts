import { Dificultad, Estado } from "./types.js";

export interface Tarea {
    nombre: string;
    descripcion: string;
    dificultad: Dificultad;
    estado: Estado;
    fechaCreacion: Date;
    fechaEdicion: Date;
    fechaVencimiento: string;
}