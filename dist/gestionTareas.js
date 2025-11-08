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
exports.generarDetalleTexto = generarDetalleTexto;
exports.crearTareaConDatos = crearTareaConDatos;
exports.detalleYEdicionTarea = detalleYEdicionTarea;
// @ts-ignore
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const types_js_1 = require("./types.js");
const utils_js_1 = require("./utils.js");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
// ============================================
// FUNCIONES PURAS - Creación y transformación
// ============================================
function crearTareaVacia() {
    return {
        id: crypto.randomUUID(),
        nombre: "",
        descripcion: "Sin descripcion",
        dificultad: types_js_1.Dificultad.FACIL,
        estado: types_js_1.Estado.PENDIENTE,
        fechaCreacion: new Date(),
        fechaEdicion: new Date(),
        fechaVencimiento: "Sin datos"
    };
}
function actualizarNombre(tarea, nuevoNombre) {
    return { ...tarea, nombre: nuevoNombre };
}
function actualizarDescripcion(tarea, nuevaDescripcion) {
    const descripcion = nuevaDescripcion.length > 0 ? nuevaDescripcion : "Sin descripcion";
    return { ...tarea, descripcion };
}
function actualizarDificultad(tarea, nuevaDificultad) {
    return { ...tarea, dificultad: nuevaDificultad };
}
function actualizarEstado(tarea, nuevoEstado) {
    return { ...tarea, estado: nuevoEstado };
}
function actualizarFechaVencimiento(tarea, nuevaFecha) {
    return { ...tarea, fechaVencimiento: nuevaFecha };
}
function actualizarFechaEdicion(tarea) {
    return { ...tarea, fechaEdicion: new Date() };
}
function procesarFechaVencimiento(fechaInput) {
    const tempFecha = new Date(fechaInput);
    if (isNaN(tempFecha.getTime())) {
        return "Sin datos";
    }
    return (0, utils_js_1.formatoFecha)(tempFecha);
}
function esTituloValido(titulo) {
    return titulo.length >= 4;
}
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
function solicitarTitulo() {
    let entrada = prompt("Ingrese el título de la tarea (Al menos 4 caracteres):");
    while (!esTituloValido(entrada)) {
        console.log("Titulo invalido o vacio, intentelo de nuevo");
        entrada = prompt("Ingrese el titulo de la tarea (al menos 4 caracteres):");
    }
    return entrada;
}
function solicitarDescripcion() {
    return prompt("Ingrese la descripcion de la tarea:");
}
function solicitarDificultad() {
    let entrada = prompt("Ingrese la dificultad de la nueva tarea [1] Fácil [2] Media [3] Dificil: ");
    entrada = (0, utils_js_1.control)(entrada);
    if (entrada.length > 0) {
        return parseInt(entrada);
    }
    return types_js_1.Dificultad.FACIL;
}
function solicitarEstado() {
    let entrada = prompt("Ingrese el estado de la nueva tarea [1] Pendiente [2] En curso [3] Terminada: ");
    entrada = (0, utils_js_1.control)(entrada);
    if (entrada.length > 0) {
        return parseInt(entrada);
    }
    return types_js_1.Estado.PENDIENTE;
}
function solicitarFechaVencimiento() {
    const fechaInput = prompt("¿Cuando vence? (formato: aaaa/mm/dd): ");
    const fechaProcesada = procesarFechaVencimiento(fechaInput);
    if (fechaProcesada === "Sin datos") {
        console.log("Fecha invalida, se guardará como 'Sin Datos'");
    }
    return fechaProcesada;
}
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
 * FUNCIÓN PURA: Retorna una NUEVA tarea editada.
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
        if (entradaDificultad.length > 0) {
            tareaEditada = actualizarDificultad(tareaEditada, parseInt(entradaDificultad));
        }
    }
    // Estado
    let entradaEstado = prompt("Ingrese el nuevo estado de la tarea [1] Pendiente [2] En curso [3] Terminada: ");
    if (entradaEstado === " ") {
        tareaEditada = actualizarEstado(tareaEditada, types_js_1.Estado.PENDIENTE);
    }
    else if (entradaEstado !== "") {
        entradaEstado = (0, utils_js_1.control)(entradaEstado);
        if (entradaEstado.length > 0) {
            tareaEditada = actualizarEstado(tareaEditada, parseInt(entradaEstado));
        }
    }
    // Fecha de vencimiento
    const entradaFecha = prompt("Ingrese nueva fecha de vencimiento: (formato: aaaa/mm/dd): ");
    if (entradaFecha === " ") {
        tareaEditada = actualizarFechaVencimiento(tareaEditada, "Sin datos");
    }
    else if (entradaFecha !== "") {
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
function detalleYEdicionTarea(tareasDisponibles) {
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
        }
        else {
            console.log("Volviendo al menu...");
            return null;
        }
    }
    else {
        console.log("Volviendo al menu...");
        return null;
    }
}
//# sourceMappingURL=gestionTareas.js.map