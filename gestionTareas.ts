import promptSync from 'prompt-sync';
import { Dificultad, Estado } from './types.js';
import { formatoFecha, control, mostrarDificultad, mostrarEstado } from './utils.js';
import { Tarea } from './tarea.js';

const prompt = promptSync({ sigint: true });

// FUNCIONES PURAS - Creación y transformación

/**
 * Crea un objeto Tarea con valores por defecto (función pura).
 * @returns {Tarea} Una nueva tarea con valores iniciales.
 */
export function crearTareaVacia(): Tarea {
    return {
        nombre: "",
        descripcion: "Sin descripcion",
        dificultad: Dificultad.FACIL,
        estado: Estado.PENDIENTE,
        fechaCreacion: new Date(),
        fechaEdicion: new Date(),
        fechaVencimiento: "Sin datos"
    };
}

/**
 * Actualiza el nombre de una tarea (función pura).
 * @param {Tarea} tarea - La tarea original.
 * @param {string} nuevoNombre - El nuevo nombre.
 * @returns {Tarea} Una NUEVA tarea con el nombre actualizado.
 */
export function actualizarNombre(tarea: Tarea, nuevoNombre: string): Tarea {
    return { ...tarea, nombre: nuevoNombre };
}

/**
 * Actualiza la descripción de una tarea (función pura).
 * @param {Tarea} tarea - La tarea original.
 * @param {string} nuevaDescripcion - La nueva descripción.
 * @returns {Tarea} Una NUEVA tarea con la descripción actualizada.
 */
export function actualizarDescripcion(tarea: Tarea, nuevaDescripcion: string): Tarea {
    const descripcion = nuevaDescripcion.length > 0 ? nuevaDescripcion : "Sin descripcion";
    return { ...tarea, descripcion };
}

/**
 * Actualiza la dificultad de una tarea (función pura).
 * @param {Tarea} tarea - La tarea original.
 * @param {Dificultad} nuevaDificultad - La nueva dificultad.
 * @returns {Tarea} Una NUEVA tarea con la dificultad actualizada.
 */
export function actualizarDificultad(tarea: Tarea, nuevaDificultad: Dificultad): Tarea {
    return { ...tarea, dificultad: nuevaDificultad };
}

/**
 * Actualiza el estado de una tarea (función pura).
 * @param {Tarea} tarea - La tarea original.
 * @param {Estado} nuevoEstado - El nuevo estado.
 * @returns {Tarea} Una NUEVA tarea con el estado actualizado.
 */
export function actualizarEstado(tarea: Tarea, nuevoEstado: Estado): Tarea {
    return { ...tarea, estado: nuevoEstado };
}

/**
 * Actualiza la fecha de vencimiento de una tarea (función pura).
 * @param {Tarea} tarea - La tarea original.
 * @param {string} nuevaFecha - La nueva fecha (ya formateada o "Sin datos").
 * @returns {Tarea} Una NUEVA tarea con la fecha actualizada.
 */
export function actualizarFechaVencimiento(tarea: Tarea, nuevaFecha: string): Tarea {
    return { ...tarea, fechaVencimiento: nuevaFecha };
}

/**
 * Actualiza la fecha de edición de una tarea (función pura).
 * @param {Tarea} tarea - La tarea original.
 * @returns {Tarea} Una NUEVA tarea con la fecha de edición actualizada.
 */
export function actualizarFechaEdicion(tarea: Tarea): Tarea {
    return { ...tarea, fechaEdicion: new Date() };
}

/**
 * Valida y formatea una fecha ingresada (función pura).
 * @param {string} fechaInput - El string de fecha ingresado.
 * @returns {string} La fecha formateada o "Sin datos" si es inválida.
 */
export function procesarFechaVencimiento(fechaInput: string): string {
    const tempFecha = new Date(fechaInput);
    if (isNaN(tempFecha.getTime())) {
        return "Sin datos";
    }
    return formatoFecha(tempFecha);
}

/**
 * Valida que un título tenga al menos 4 caracteres (función pura).
 * @param {string} titulo - El título a validar.
 * @returns {boolean} true si es válido, false si no.
 */
export function esTituloValido(titulo: string): boolean {
    return titulo.length >= 4;
}

/**
 * Reemplaza una tarea en un array por su índice (función pura).
 * @param {Tarea[]} tareas - El array original.
 * @param {number} indice - El índice de la tarea a reemplazar.
 * @param {Tarea} tareaActualizada - La nueva tarea.
 * @returns {Tarea[]} Un NUEVO array con la tarea reemplazada.
 */
export function reemplazarTareaEnArray(tareas: Tarea[], indice: number, tareaActualizada: Tarea): Tarea[] {
    return tareas.map(function(tarea, i) {
        return i === indice ? tareaActualizada : tarea;
    });
}

/**
 * Genera el texto de detalle de una tarea (función pura).
 * @param {Tarea} tarea - La tarea a mostrar.
 * @returns {string} El texto formateado del detalle.
 */
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

/**
 * Solicita y valida el título de una tarea.
 * @returns {string} El título válido ingresado por el usuario.
 */
function solicitarTitulo(): string {
    let entrada = prompt("Ingrese el título de la tarea (Al menos 4 caracteres):");
    
    while (!esTituloValido(entrada)) {
        console.log("Titulo invalido o vacio, intentelo de nuevo");
        entrada = prompt("Ingrese el titulo de la tarea (al menos 4 caracteres):");
    }
    
    return entrada;
}

/**
 * Solicita la descripción de una tarea.
 * @returns {string} La descripción ingresada.
 */
function solicitarDescripcion(): string {
    return prompt("Ingrese la descripcion de la tarea:");
}

/**
 * Solicita la dificultad de una tarea.
 * @returns {Dificultad} La dificultad seleccionada.
 */
function solicitarDificultad(): Dificultad {
    let entrada = prompt("Ingrese la dificultad de la nueva tarea [1] Fácil [2] Media [3] Dificil: ");
    entrada = control(entrada);
    
    if (entrada.length > 0) {
        return parseInt(entrada) as Dificultad;
    }
    return Dificultad.FACIL;
}

/**
 * Solicita el estado de una tarea.
 * @returns {Estado} El estado seleccionado.
 */
function solicitarEstado(): Estado {
    let entrada = prompt("Ingrese el estado de la nueva tarea [1] Pendiente [2] En curso [3] Terminada: ");
    entrada = control(entrada);
    
    if (entrada.length > 0) {
        return parseInt(entrada) as Estado;
    }
    return Estado.PENDIENTE;
}

/**
 * Solicita y valida la fecha de vencimiento.
 * @returns {string} La fecha formateada o "Sin datos".
 */
function solicitarFechaVencimiento(): string {
    const fechaInput = prompt("¿Cuando vence? (formato: aaaa/mm/dd): ");
    const fechaProcesada = procesarFechaVencimiento(fechaInput);
    
    if (fechaProcesada === "Sin datos") {
        console.log("Fecha invalida, se guardará como 'Sin Datos'");
    }
    
    return fechaProcesada;
}

/**
 * Recopila los datos del usuario para crear una nueva tarea.
 * @returns {Tarea} El objeto Tarea completo listo para ser agregado.
 */
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
 * @param {Tarea} tareaOriginal - La tarea a editar.
 * @returns {Tarea} La tarea editada (nueva instancia).
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
        tareaEditada = actualizarDificultad(tareaEditada, parseInt(entradaDificultad) as Dificultad);
    }
    
    // Estado
    let entradaEstado = prompt("Ingrese el nuevo estado de la tarea [1] Pendiente [2] En curso [3] Terminada: ");
    if (entradaEstado === " ") {
        tareaEditada = actualizarEstado(tareaEditada, Estado.PENDIENTE);
    } else if (entradaEstado !== "") {
        entradaEstado = control(entradaEstado);
        tareaEditada = actualizarEstado(tareaEditada, parseInt(entradaEstado) as Estado);
    }
    
    // Fecha de vencimiento
    const entradaFecha = prompt("Ingrese nueva fecha de vencimiento: (formato: aaaa/mm/dd): ");
    if (entradaFecha === " ") {
        tareaEditada = actualizarFechaVencimiento(tareaEditada, "Sin datos");
    } else {
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
 * Edita una tarea del array en la posición indicada.
 * @param {number} indice - El índice de la tarea (1-based).
 * @param {Tarea[]} arrTareas - El array de tareas.
 * @returns {Tarea[]} Un NUEVO array con la tarea editada.
 */
export function editarTarea(indice: number, arrTareas: Tarea[]): Tarea[] {
    const tareaOriginal = arrTareas[indice - 1];
    const tareaEditada = solicitarEdicionTarea(tareaOriginal);
    
    console.log("Tarea editada con exito!");
    console.log("Presione enter para continuar");
    prompt("");
    
    return reemplazarTareaEnArray(arrTareas, indice - 1, tareaEditada);
}

/**
 * Muestra el detalle de una tarea y permite editarla.
 * @param {Tarea[]} arrTareas - El array de tareas.
 * @returns {Tarea[]} El array de tareas (potencialmente modificado si se editó).
 */
export function detalleTarea(arrTareas: Tarea[]): Tarea[] {
    let entrada = prompt("Ingrese el número de tarea para ver en detalle o '0' para volver al menu: ");
    let opMenuesAdentro = parseInt(entrada);
    
    while (isNaN(opMenuesAdentro) || opMenuesAdentro < 0 || opMenuesAdentro > arrTareas.length) {
        entrada = prompt("Opción invalida, intentelo de nuevo: ");
        opMenuesAdentro = parseInt(entrada);
    }

    if (opMenuesAdentro !== 0) {
        const tarea = arrTareas[opMenuesAdentro - 1];
        const detalleTexto = generarDetalleTexto(tarea);
        console.log(detalleTexto);

        entrada = prompt("Presione enter para continuar o E para editar la tarea: ");

        while (entrada !== "e" && entrada !== "E" && entrada !== "") {
            console.log("Opción invalida, intentelo de nuevo");
            entrada = prompt("Ingrese la opción: ");
        }

        if (entrada === "e" || entrada === "E") {
            return editarTarea(opMenuesAdentro, arrTareas);
        } else {
            console.log("Volviendo al menu...");
            return arrTareas;
        }
    } else {
        console.log("Volviendo al menu...");
        return arrTareas;
    }
}