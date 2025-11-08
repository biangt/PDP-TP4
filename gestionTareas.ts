// @ts-ignore
import promptSync from 'prompt-sync';
import { Dificultad, Estado } from './types.js';
import { formatoFecha, control, mostrarDificultad, mostrarEstado } from './utils.js';
import { Tarea } from './tarea.js';

const prompt = promptSync({ sigint: true });

// ============================================
// FUNCIONES PURAS - Creación y transformación
// ============================================

export function crearTareaVacia(): Tarea {
    return {
        id: crypto.randomUUID(),
        nombre: "",
        descripcion: "Sin descripcion",
        dificultad: Dificultad.FACIL,
        estado: Estado.PENDIENTE,
        fechaCreacion: new Date(),
        fechaEdicion: new Date(),
        fechaVencimiento: "Sin datos"
    };
}

export function actualizarNombre(tarea: Tarea, nuevoNombre: string): Tarea {
    return { ...tarea, nombre: nuevoNombre };
}

export function actualizarDescripcion(tarea: Tarea, nuevaDescripcion: string): Tarea {
    const descripcion = nuevaDescripcion.length > 0 ? nuevaDescripcion : "Sin descripcion";
    return { ...tarea, descripcion };
}

export function actualizarDificultad(tarea: Tarea, nuevaDificultad: Dificultad): Tarea {
    return { ...tarea, dificultad: nuevaDificultad };
}

export function actualizarEstado(tarea: Tarea, nuevoEstado: Estado): Tarea {
    return { ...tarea, estado: nuevoEstado };
}

export function actualizarFechaVencimiento(tarea: Tarea, nuevaFecha: string): Tarea {
    return { ...tarea, fechaVencimiento: nuevaFecha };
}

export function actualizarFechaEdicion(tarea: Tarea): Tarea {
    return { ...tarea, fechaEdicion: new Date() };
}

export function procesarFechaVencimiento(fechaInput: string): string {
    const tempFecha = new Date(fechaInput);
    if (isNaN(tempFecha.getTime())) {
        return "Sin datos";
    }
    return formatoFecha(tempFecha);
}

export function esTituloValido(titulo: string): boolean {
    return titulo.length >= 4;
}

export function generarDetalleTexto(tarea: Tarea): string {
    const estadoConTexto = mostrarEstado(tarea.estado);
    const dificultadConEmoji = mostrarDificultad(tarea.dificultad);
    
    return `Título: ${tarea.nombre}
Descripción: ${tarea.descripcion}
Estado: ${estadoConTexto}
Dificultad: ${dificultadConEmoji}
Fecha de creación: ${formatoFecha(tarea.fechaCreacion)}
Fecha de vencimiento: ${tarea.fechaVencimiento}`;
}

// ============================================
// FUNCIONES IMPURAS - Interacción con usuario
// ============================================

function solicitarTitulo(): string {
    let entrada = prompt("Ingrese el título de la tarea (Al menos 4 caracteres):");
    
    while (!esTituloValido(entrada)) {
        console.log("Titulo invalido o vacio, intentelo de nuevo");
        entrada = prompt("Ingrese el titulo de la tarea (al menos 4 caracteres):");
    }
    
    return entrada;
}

function solicitarDescripcion(): string {
    return prompt("Ingrese la descripcion de la tarea:");
}

function solicitarDificultad(): Dificultad {
    let entrada = prompt("Ingrese la dificultad de la nueva tarea [1] Fácil [2] Media [3] Dificil: ");
    entrada = control(entrada);
    
    if (entrada.length > 0) {
        return parseInt(entrada) as Dificultad;
    }
    return Dificultad.FACIL;
}

function solicitarEstado(): Estado {
    let entrada = prompt("Ingrese el estado de la nueva tarea [1] Pendiente [2] En curso [3] Terminada: ");
    entrada = control(entrada);
    
    if (entrada.length > 0) {
        return parseInt(entrada) as Estado;
    }
    return Estado.PENDIENTE;
}

function solicitarFechaVencimiento(): string {
    const fechaInput = prompt("¿Cuando vence? (formato: aaaa/mm/dd): ");
    const fechaProcesada = procesarFechaVencimiento(fechaInput);
    
    if (fechaProcesada === "Sin datos") {
        console.log("Fecha invalida, se guardará como 'Sin Datos'");
    }
    
    return fechaProcesada;
}

export function crearTareaConDatos(): Tarea {
    let nuevaTarea = crearTareaVacia();
    
    const titulo = solicitarTitulo();
    nuevaTarea = actualizarNombre(nuevaTarea, titulo);
    
    const descripcion = solicitarDescripcion();
    nuevaTarea = actualizarDescripcion(nuevaTarea, descripcion);
    
    const dificultad = solicitarDificultad();
    nuevaTarea = actualizarDificultad(nuevaTarea, dificultad);
    
    const estado = solicitarEstado();
    nuevaTarea = actualizarEstado(nuevaTarea, estado);
    
    const fechaVencimiento = solicitarFechaVencimiento();
    nuevaTarea = actualizarFechaVencimiento(nuevaTarea, fechaVencimiento);
    
    return nuevaTarea;
}

/**
 * Solicita y procesa la edición de una tarea.
 * FUNCIÓN PURA: Retorna una NUEVA tarea editada.
 */
function solicitarEdicionTarea(tareaOriginal: Tarea): Tarea {
    let tareaEditada = tareaOriginal;
    
    console.log('Ingrese un espacio para vaciar el campo (o ir al valor por default), enter para conservar el valor o una nueva entrada para modificarlo: ');
    
    // Descripción
    const entradaDescripcion = prompt("Ingrese la nueva descripcion de la tarea: ");
    if (entradaDescripcion === " ") {
        tareaEditada = actualizarDescripcion(tareaEditada, "");
    } else if (entradaDescripcion !== "") {
        tareaEditada = actualizarDescripcion(tareaEditada, entradaDescripcion);
    }
    
    // Dificultad
    let entradaDificultad = prompt("Ingrese la nueva dificultad de la tarea [1] Fácil [2] Media [3] Dificil: ");
    if (entradaDificultad === " ") {
        tareaEditada = actualizarDificultad(tareaEditada, Dificultad.FACIL);
    } else if (entradaDificultad !== "") {
        entradaDificultad = control(entradaDificultad);
        if (entradaDificultad.length > 0) {
            tareaEditada = actualizarDificultad(tareaEditada, parseInt(entradaDificultad) as Dificultad);
        }
    }
    
    // Estado
    let entradaEstado = prompt("Ingrese el nuevo estado de la tarea [1] Pendiente [2] En curso [3] Terminada: ");
    if (entradaEstado === " ") {
        tareaEditada = actualizarEstado(tareaEditada, Estado.PENDIENTE);
    } else if (entradaEstado !== "") {
        entradaEstado = control(entradaEstado);
        if (entradaEstado.length > 0) {
            tareaEditada = actualizarEstado(tareaEditada, parseInt(entradaEstado) as Estado);
        }
    }
    
    // Fecha de vencimiento
    const entradaFecha = prompt("Ingrese nueva fecha de vencimiento: (formato: aaaa/mm/dd): ");
    if (entradaFecha === " ") {
        tareaEditada = actualizarFechaVencimiento(tareaEditada, "Sin datos");
    } else if (entradaFecha !== "") {
        const fechaProcesada = procesarFechaVencimiento(entradaFecha);
        if (fechaProcesada === "Sin datos") {
            console.log("Fecha invalida, se guardará como 'Sin Datos'");
        }
        tareaEditada = actualizarFechaVencimiento(tareaEditada, fechaProcesada);
    }
    
    // Actualizar fecha de edición
    tareaEditada = actualizarFechaEdicion(tareaEditada);
    
    return tareaEditada;
}

/**
 * NUEVA FUNCIÓN: Muestra el detalle de tareas del array proporcionado.
 * Ya NO edita directamente - solo retorna la tarea editada o null.
 * 
 * @param {Tarea[]} tareasDisponibles - Las tareas que el usuario puede ver/editar.
 * @returns {Tarea | null} La tarea editada o null si no se editó nada.
 */
export function detalleYEdicionTarea(tareasDisponibles: Tarea[]): Tarea | null {
    let entrada = prompt("Ingrese el número de tarea para ver en detalle o '0' para volver al menu: ");
    let opMenuesAdentro = parseInt(entrada);
    
    while (isNaN(opMenuesAdentro) || opMenuesAdentro < 0 || opMenuesAdentro > tareasDisponibles.length) {
        entrada = prompt("Opción invalida, intentelo de nuevo: ");
        opMenuesAdentro = parseInt(entrada);
    }

    if (opMenuesAdentro !== 0) {
        const tareaSeleccionada = tareasDisponibles[opMenuesAdentro - 1];
        const detalleTexto = generarDetalleTexto(tareaSeleccionada);
        console.log(detalleTexto);

        entrada = prompt("Presione enter para continuar o E para editar la tarea: ");

        while (entrada !== "e" && entrada !== "E" && entrada !== "") {
            console.log("Opción invalida, intentelo de nuevo");
            entrada = prompt("Ingrese la opción: ");
        }

        if (entrada === "e" || entrada === "E") {
            const tareaEditada = solicitarEdicionTarea(tareaSeleccionada);
            console.log("Tarea editada con exito!");
            console.log("Presione enter para continuar");
            prompt("");
            return tareaEditada; // Retornar la tarea editada
        } else {
            console.log("Volviendo al menu...");
            return null;
        }
    } else {
        console.log("Volviendo al menu...");
        return null;
    }
}