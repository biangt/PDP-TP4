"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarTareaALista = agregarTareaALista;
exports.filtrarTareasPorEstado = filtrarTareasPorEstado;
exports.buscarTareasPorNombre = buscarTareasPorNombre;
exports.reemplazarTareaEnListaOriginal = reemplazarTareaEnListaOriginal;
exports.obtenerTareasFiltradas = obtenerTareasFiltradas;
exports.obtenerTareasEncontradas = obtenerTareasEncontradas;
exports.verTareaFiltro = verTareaFiltro;
exports.buscarConIndexOf = buscarConIndexOf;
exports.manejarVerTareas = manejarVerTareas;
exports.manejarBuscarTareas = manejarBuscarTareas;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const types_js_1 = require("./types.js");
const gestionTareas_js_1 = require("./gestionTareas.js");
const utils_js_1 = require("./utils.js");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
// ============================================
// FUNCIONES PURAS - Transformaciones de datos
// ============================================
/**
 * Agrega una tarea al arreglo de tareas de forma INMUTABLE.
 */
function agregarTareaALista(tareas, nuevaTarea) {
    return [...tareas, nuevaTarea];
}
/**
 * Filtra tareas por estado (función pura).
 */
function filtrarTareasPorEstado(tareas, estadoBuscado) {
    return tareas.filter(function (tarea) {
        return tarea.estado === estadoBuscado;
    });
}
/**
 * Busca tareas que contengan un texto en su nombre (función pura).
 */
function buscarTareasPorNombre(tareas, textoBusqueda) {
    const textoBusquedaLower = textoBusqueda.toLowerCase();
    return tareas.filter(function (tarea) {
        return tarea.nombre.toLowerCase().indexOf(textoBusquedaLower) !== -1;
    });
}
/**
 * Reemplaza una tarea en el array original usando su ID (función pura).
 * NUEVA: Esta función compone los cambios de vuelta al array original.
 */
function reemplazarTareaEnListaOriginal(tareasOriginales, tareaEditada) {
    return tareasOriginales.map(function (tarea) {
        return tarea.id === tareaEditada.id ? tareaEditada : tarea;
    });
}
/**
 * Obtiene las tareas filtradas por estado (función pura).
 */
function obtenerTareasFiltradas(tareas, estadoBuscado) {
    const tareasFiltradas = filtrarTareasPorEstado(tareas, estadoBuscado);
    return tareasFiltradas.length === 0 ? null : tareasFiltradas;
}
/**
 * Busca tareas por nombre (función pura).
 */
function obtenerTareasEncontradas(tareas, textoBusqueda) {
    const tareasEncontradas = buscarTareasPorNombre(tareas, textoBusqueda);
    return tareasEncontradas.length === 0 ? null : tareasEncontradas;
}
// ============================================
// FUNCIONES IMPURAS - Visualización e interacción
// ============================================
/**
 * Muestra las tareas filtradas por estado.
 * MODIFICADA: Ahora retorna las tareas originales actualizadas.
 */
function verTareaFiltro(tareas, estadoBuscado) {
    const tareasFiltradas = obtenerTareasFiltradas(tareas, estadoBuscado);
    if (tareasFiltradas === null) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.NO_HAY_TAREAS_ESTADO);
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return tareas;
    }
    // Mostrar solo las tareas filtradas
    (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.LISTA_TAREAS, tareasFiltradas);
    // Permitir ver detalle SOLO de las tareas filtradas
    const tareaEditadaONull = (0, gestionTareas_js_1.detalleYEdicionTarea)(tareasFiltradas);
    // Si se editó una tarea, componerla de vuelta al array original
    if (tareaEditadaONull !== null) {
        return reemplazarTareaEnListaOriginal(tareas, tareaEditadaONull);
    }
    return tareas;
}
/**
 * Busca y muestra tareas por nombre.
 */
function buscarConIndexOf(tareas, textoBusqueda) {
    const tareasEncontradas = obtenerTareasEncontradas(tareas, textoBusqueda);
    if (tareasEncontradas === null) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.NO_SE_ENCONTRARON_TAREAS);
    }
    else {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.LISTA_TAREAS, tareasEncontradas);
    }
}
/**
 * Maneja el menú de ver tareas con sus opciones.
 */
function manejarVerTareas(tareas) {
    if (tareas.length === 0) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.NO_HAY_TAREAS);
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return tareas;
    }
    (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.MENU_VER_TAREAS, undefined, true);
    const entrada = prompt("Indique la opción: ");
    const opMenuInterno = parseInt(entrada);
    switch (opMenuInterno) {
        case 1: {
            (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.LISTA_TAREAS, tareas);
            const tareaEditadaONull = (0, gestionTareas_js_1.detalleYEdicionTarea)(tareas);
            return tareaEditadaONull !== null
                ? reemplazarTareaEnListaOriginal(tareas, tareaEditadaONull)
                : tareas;
        }
        case 2:
            return verTareaFiltro(tareas, types_js_1.Estado.PENDIENTE);
        case 3:
            return verTareaFiltro(tareas, types_js_1.Estado.EN_CURSO);
        case 4:
            return verTareaFiltro(tareas, types_js_1.Estado.TERMINADA);
        case 0:
            return tareas;
        default:
            (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.OPCION_INVALIDA);
            (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
            prompt("");
            return tareas;
    }
}
/**
 * Maneja el proceso de búsqueda de tareas.
 */
function manejarBuscarTareas(tareas) {
    console.clear();
    if (tareas.length === 0) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.NO_HAY_TAREAS);
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return;
    }
    let entrada = prompt("Ingrese el título de la tarea a buscar: ");
    while (entrada.length < 1) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.TITULO_INVALIDO);
        entrada = prompt("Ingrese el titulo de la tarea (al menos 1 caracter): ");
    }
    buscarConIndexOf(tareas, entrada);
    (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
    prompt("");
}
//# sourceMappingURL=gestionListas.js.map