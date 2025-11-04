"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarTareaALista = agregarTareaALista;
exports.filtrarTareasPorEstado = filtrarTareasPorEstado;
exports.buscarTareasPorNombre = buscarTareasPorNombre;
exports.obtenerIndicesOriginales = obtenerIndicesOriginales;
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
// FUNCIONES PURAS - Transformaciones de datos
/**
 * Agrega una tarea al arreglo de tareas de forma INMUTABLE.
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @param {Tarea} nuevaTarea - El objeto Tarea a agregar.
 * @returns {Tarea[]} Un NUEVO arreglo con la tarea agregada.
 */
function agregarTareaALista(tareas, nuevaTarea) {
    return [...tareas, nuevaTarea];
}
/**
 * Filtra tareas por estado (función pura).
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @param {Estado} estadoBuscado - El estado a filtrar.
 * @returns {Tarea[]} Un NUEVO arreglo con las tareas filtradas.
 */
function filtrarTareasPorEstado(tareas, estadoBuscado) {
    return tareas.filter(function (tarea) {
        return tarea.estado === estadoBuscado;
    });
}
/**
 * Busca tareas que contengan un texto en su nombre (función pura).
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @param {string} textoBusqueda - El texto a buscar.
 * @returns {Tarea[]} Un NUEVO arreglo con las tareas que coinciden.
 */
function buscarTareasPorNombre(tareas, textoBusqueda) {
    const textoBusquedaLower = textoBusqueda.toLowerCase();
    return tareas.filter(function (tarea) {
        return tarea.nombre.toLowerCase().indexOf(textoBusquedaLower) !== -1;
    });
}
/**
 * Obtiene los índices originales de tareas filtradas (función pura).
 * @param {Tarea[]} tareasOriginales - El arreglo original.
 * @param {Tarea[]} tareasFiltradas - El arreglo filtrado.
 * @returns {number[]} Array con los índices originales.
 */
function obtenerIndicesOriginales(tareasOriginales, tareasFiltradas) {
    return tareasFiltradas.map(function (tareaFiltrada) {
        return tareasOriginales.indexOf(tareaFiltrada);
    });
}
/**
 * Obtiene las tareas filtradas por estado con sus índices originales (función pura).
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @param {Estado} estadoBuscado - El estado a filtrar.
 * @returns {{tareas: Tarea[], indicesOriginales: number[]} | null} Objeto con tareas e índices, o null si no hay resultados.
 */
function obtenerTareasFiltradas(tareas, estadoBuscado) {
    const tareasFiltradas = filtrarTareasPorEstado(tareas, estadoBuscado);
    if (tareasFiltradas.length === 0) {
        return null;
    }
    const indicesOriginales = obtenerIndicesOriginales(tareas, tareasFiltradas);
    return {
        tareas: tareasFiltradas,
        indicesOriginales: indicesOriginales
    };
}
/**
 * Busca tareas por nombre y obtiene sus índices originales (función pura).
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @param {string} textoBusqueda - El texto a buscar.
 * @returns {{tareas: Tarea[], indicesOriginales: number[]} | null} Objeto con tareas e índices, o null si no hay resultados.
 */
function obtenerTareasEncontradas(tareas, textoBusqueda) {
    const tareasEncontradas = buscarTareasPorNombre(tareas, textoBusqueda);
    if (tareasEncontradas.length === 0) {
        return null;
    }
    const indicesOriginales = obtenerIndicesOriginales(tareas, tareasEncontradas);
    return {
        tareas: tareasEncontradas,
        indicesOriginales: indicesOriginales
    };
}
// FUNCIONES IMPURAS - Visualización e interacción con el usuario
/**
 * Muestra las tareas filtradas por estado.
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @param {Estado} estadoBuscado - El estado a filtrar.
 * @returns {Tarea[]} El array de tareas (potencialmente modificado si se editó).
 */
function verTareaFiltro(tareas, estadoBuscado) {
    const resultado = obtenerTareasFiltradas(tareas, estadoBuscado);
    if (resultado === null) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.NO_HAY_TAREAS_ESTADO);
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return tareas;
    }
    else {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.LISTA_TAREAS_FILTRADAS, resultado);
        return (0, gestionTareas_js_1.detalleTarea)(tareas);
    }
}
/**
 * Busca y muestra tareas por nombre.
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @param {string} textoBusqueda - El texto a buscar.
 */
function buscarConIndexOf(tareas, textoBusqueda) {
    const resultado = obtenerTareasEncontradas(tareas, textoBusqueda);
    if (resultado === null) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.NO_SE_ENCONTRARON_TAREAS);
    }
    else {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.LISTA_TAREAS_FILTRADAS, resultado);
    }
}
/**
 * Maneja el menú de ver tareas con sus opciones.
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @returns {Tarea[]} El array de tareas (potencialmente modificado).
 */
function manejarVerTareas(tareas) {
    (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.MENU_VER_TAREAS, undefined, true);
    if (tareas.length === 0) {
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.NO_HAY_TAREAS);
        (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return tareas;
    }
    const entrada = prompt("Indique la opción: ");
    const opMenuInterno = parseInt(entrada);
    switch (opMenuInterno) {
        case 1:
            (0, utils_js_1.imprimir)(types_js_1.TipoMensaje.LISTA_TAREAS, tareas);
            return (0, gestionTareas_js_1.detalleTarea)(tareas);
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
 * @param {Tarea[]} tareas - El arreglo de tareas.
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