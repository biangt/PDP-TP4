"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTareaVacia = crearTareaVacia;
exports.actualizarNombre = actualizarNombre;
exports.actualizarDescripcion = actualizarDescripcion;
exports.actualizarDificultad = actualizarDificultad;
exports.actualizarEstado = actualizarEstado;
exports.actualizarFechaVencimiento = actualizarFechaVencimiento;
exports.actualizarFechaEdicion = actualizarFechaEdicion;
exports.procesarFechaVencimiento = procesarFechaVencimiento;
exports.esTituloValido = esTituloValido;
exports.reemplazarTareaEnArray = reemplazarTareaEnArray;
exports.generarDetalleTexto = generarDetalleTexto;
exports.crearTareaConDatos = crearTareaConDatos;
exports.editarTarea = editarTarea;
exports.detalleTarea = detalleTarea;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const types_js_1 = require("./types.js");
const utils_js_1 = require("./utils.js");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
// FUNCIONES PURAS - Creación y transformación
/**
 * Crea un objeto Tarea con valores por defecto (función pura).
 * @returns {Tarea} Una nueva tarea con valores iniciales.
 */
function crearTareaVacia() {
    return {
        nombre: "",
        descripcion: "Sin descripcion",
        dificultad: types_js_1.Dificultad.FACIL,
        estado: types_js_1.Estado.PENDIENTE,
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
function actualizarNombre(tarea, nuevoNombre) {
    return { ...tarea, nombre: nuevoNombre };
}
/**
 * Actualiza la descripción de una tarea (función pura).
 * @param {Tarea} tarea - La tarea original.
 * @param {string} nuevaDescripcion - La nueva descripción.
 * @returns {Tarea} Una NUEVA tarea con la descripción actualizada.
 */
function actualizarDescripcion(tarea, nuevaDescripcion) {
    const descripcion = nuevaDescripcion.length > 0 ? nuevaDescripcion : "Sin descripcion";
    return { ...tarea, descripcion };
}
/**
 * Actualiza la dificultad de una tarea (función pura).
 * @param {Tarea} tarea - La tarea original.
 * @param {Dificultad} nuevaDificultad - La nueva dificultad.
 * @returns {Tarea} Una NUEVA tarea con la dificultad actualizada.
 */
function actualizarDificultad(tarea, nuevaDificultad) {
    return { ...tarea, dificultad: nuevaDificultad };
}
/**
 * Actualiza el estado de una tarea (función pura).
 * @param {Tarea} tarea - La tarea original.
 * @param {Estado} nuevoEstado - El nuevo estado.
 * @returns {Tarea} Una NUEVA tarea con el estado actualizado.
 */
function actualizarEstado(tarea, nuevoEstado) {
    return { ...tarea, estado: nuevoEstado };
}
/**
 * Actualiza la fecha de vencimiento de una tarea (función pura).
 * @param {Tarea} tarea - La tarea original.
 * @param {string} nuevaFecha - La nueva fecha (ya formateada o "Sin datos").
 * @returns {Tarea} Una NUEVA tarea con la fecha actualizada.
 */
function actualizarFechaVencimiento(tarea, nuevaFecha) {
    return { ...tarea, fechaVencimiento: nuevaFecha };
}
/**
 * Actualiza la fecha de edición de una tarea (función pura).
 * @param {Tarea} tarea - La tarea original.
 * @returns {Tarea} Una NUEVA tarea con la fecha de edición actualizada.
 */
function actualizarFechaEdicion(tarea) {
    return { ...tarea, fechaEdicion: new Date() };
}
/**
 * Valida y formatea una fecha ingresada (función pura).
 * @param {string} fechaInput - El string de fecha ingresado.
 * @returns {string} La fecha formateada o "Sin datos" si es inválida.
 */
function procesarFechaVencimiento(fechaInput) {
    const tempFecha = new Date(fechaInput);
    if (isNaN(tempFecha.getTime())) {
        return "Sin datos";
    }
    return (0, utils_js_1.formatoFecha)(tempFecha);
}
/**
 * Valida que un título tenga al menos 4 caracteres (función pura).
 * @param {string} titulo - El título a validar.
 * @returns {boolean} true si es válido, false si no.
 */
function esTituloValido(titulo) {
    return titulo.length >= 4;
}
/**
 * Reemplaza una tarea en un array por su índice (función pura).
 * @param {Tarea[]} tareas - El array original.
 * @param {number} indice - El índice de la tarea a reemplazar.
 * @param {Tarea} tareaActualizada - La nueva tarea.
 * @returns {Tarea[]} Un NUEVO array con la tarea reemplazada.
 */
function reemplazarTareaEnArray(tareas, indice, tareaActualizada) {
    return tareas.map(function (tarea, i) {
        return i === indice ? tareaActualizada : tarea;
    });
}
/**
 * Genera el texto de detalle de una tarea (función pura).
 * @param {Tarea} tarea - La tarea a mostrar.
 * @returns {string} El texto formateado del detalle.
 */
function generarDetalleTexto(tarea) {
    const estadoConTexto = (0, utils_js_1.mostrarEstado)(tarea.estado);
    const dificultadConEmoji = (0, utils_js_1.mostrarDificultad)(tarea.dificultad);
    return `Título: ${tarea.nombre}
Descripción: ${tarea.descripcion}
Estado: ${estadoConTexto}
Dificultad: ${dificultadConEmoji}
Fecha de creación: ${(0, utils_js_1.formatoFecha)(tarea.fechaCreacion)}
Fecha de vencimiento: ${tarea.fechaVencimiento}`;
}
// ============================================
// FUNCIONES IMPURAS - Interacción con usuario
// ============================================
/**
 * Solicita y valida el título de una tarea.
 * @returns {string} El título válido ingresado por el usuario.
 */
function solicitarTitulo() {
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
function solicitarDescripcion() {
    return prompt("Ingrese la descripcion de la tarea:");
}
/**
 * Solicita la dificultad de una tarea.
 * @returns {Dificultad} La dificultad seleccionada.
 */
function solicitarDificultad() {
    let entrada = prompt("Ingrese la dificultad de la nueva tarea [1] Fácil [2] Media [3] Dificil: ");
    entrada = (0, utils_js_1.control)(entrada);
    if (entrada.length > 0) {
        return parseInt(entrada);
    }
    return types_js_1.Dificultad.FACIL;
}
/**
 * Solicita el estado de una tarea.
 * @returns {Estado} El estado seleccionado.
 */
function solicitarEstado() {
    let entrada = prompt("Ingrese el estado de la nueva tarea [1] Pendiente [2] En curso [3] Terminada: ");
    entrada = (0, utils_js_1.control)(entrada);
    if (entrada.length > 0) {
        return parseInt(entrada);
    }
    return types_js_1.Estado.PENDIENTE;
}
/**
 * Solicita y valida la fecha de vencimiento.
 * @returns {string} La fecha formateada o "Sin datos".
 */
function solicitarFechaVencimiento() {
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
function crearTareaConDatos() {
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
function solicitarEdicionTarea(tareaOriginal) {
    let tareaEditada = tareaOriginal;
    console.log('Ingrese un espacio para vaciar el campo (o ir al valor por default), enter para conservar el valor o una nueva entrada para modificarlo: ');
    // Descripción
    const entradaDescripcion = prompt("Ingrese la nueva descripcion de la tarea: ");
    if (entradaDescripcion === " ") {
        tareaEditada = actualizarDescripcion(tareaEditada, "");
    }
    else if (entradaDescripcion !== "") {
        tareaEditada = actualizarDescripcion(tareaEditada, entradaDescripcion);
    }
    // Dificultad
    let entradaDificultad = prompt("Ingrese la nueva dificultad de la tarea [1] Fácil [2] Media [3] Dificil: ");
    if (entradaDificultad === " ") {
        tareaEditada = actualizarDificultad(tareaEditada, types_js_1.Dificultad.FACIL);
    }
    else if (entradaDificultad !== "") {
        entradaDificultad = (0, utils_js_1.control)(entradaDificultad);
        tareaEditada = actualizarDificultad(tareaEditada, parseInt(entradaDificultad));
    }
    // Estado
    let entradaEstado = prompt("Ingrese el nuevo estado de la tarea [1] Pendiente [2] En curso [3] Terminada: ");
    if (entradaEstado === " ") {
        tareaEditada = actualizarEstado(tareaEditada, types_js_1.Estado.PENDIENTE);
    }
    else if (entradaEstado !== "") {
        entradaEstado = (0, utils_js_1.control)(entradaEstado);
        tareaEditada = actualizarEstado(tareaEditada, parseInt(entradaEstado));
    }
    // Fecha de vencimiento
    const entradaFecha = prompt("Ingrese nueva fecha de vencimiento: (formato: aaaa/mm/dd): ");
    if (entradaFecha === " ") {
        tareaEditada = actualizarFechaVencimiento(tareaEditada, "Sin datos");
    }
    else {
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
function editarTarea(indice, arrTareas) {
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
function detalleTarea(arrTareas) {
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
        }
        else {
            console.log("Volviendo al menu...");
            return arrTareas;
        }
    }
    else {
        console.log("Volviendo al menu...");
        return arrTareas;
    }
}
//# sourceMappingURL=gestionTareas.js.map