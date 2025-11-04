import promptSync from 'prompt-sync';
import { Tarea } from './tarea.js';
import { Estado, TipoMensaje } from './types.js';
import { detalleTarea } from './gestionTareas.js';
import { imprimir } from './utils.js';

const prompt = promptSync({ sigint: true });


// FUNCIONES PURAS - Transformaciones de datos

/**
 * Agrega una tarea al arreglo de tareas de forma INMUTABLE.
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @param {Tarea} nuevaTarea - El objeto Tarea a agregar.
 * @returns {Tarea[]} Un NUEVO arreglo con la tarea agregada.
 */
export function agregarTareaALista(tareas: Tarea[], nuevaTarea: Tarea): Tarea[] {
    return [...tareas, nuevaTarea];
}

/**
 * Filtra tareas por estado (función pura).
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @param {Estado} estadoBuscado - El estado a filtrar.
 * @returns {Tarea[]} Un NUEVO arreglo con las tareas filtradas.
 */
export function filtrarTareasPorEstado(tareas: Tarea[], estadoBuscado: Estado): Tarea[] {
    return tareas.filter(function(tarea) {
        return tarea.estado === estadoBuscado;
    });
}

/**
 * Busca tareas que contengan un texto en su nombre (función pura).
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @param {string} textoBusqueda - El texto a buscar.
 * @returns {Tarea[]} Un NUEVO arreglo con las tareas que coinciden.
 */
export function buscarTareasPorNombre(tareas: Tarea[], textoBusqueda: string): Tarea[] {
    const textoBusquedaLower = textoBusqueda.toLowerCase();
    return tareas.filter(function(tarea) {
        return tarea.nombre.toLowerCase().indexOf(textoBusquedaLower) !== -1;
    });
}

/**
 * Obtiene los índices originales de tareas filtradas (función pura).
 * @param {Tarea[]} tareasOriginales - El arreglo original.
 * @param {Tarea[]} tareasFiltradas - El arreglo filtrado.
 * @returns {number[]} Array con los índices originales.
 */
export function obtenerIndicesOriginales(tareasOriginales: Tarea[], tareasFiltradas: Tarea[]): number[] {
    return tareasFiltradas.map(function(tareaFiltrada) {
        return tareasOriginales.indexOf(tareaFiltrada);
    });
}

/**
 * Obtiene las tareas filtradas por estado con sus índices originales (función pura).
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @param {Estado} estadoBuscado - El estado a filtrar.
 * @returns {{tareas: Tarea[], indicesOriginales: number[]} | null} Objeto con tareas e índices, o null si no hay resultados.
 */
export function obtenerTareasFiltradas(tareas: Tarea[], estadoBuscado: Estado): {tareas: Tarea[], indicesOriginales: number[]} | null {
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
export function obtenerTareasEncontradas(tareas: Tarea[], textoBusqueda: string): {tareas: Tarea[], indicesOriginales: number[]} | null {
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
export function verTareaFiltro(tareas: Tarea[], estadoBuscado: Estado): Tarea[] {
    const resultado = obtenerTareasFiltradas(tareas, estadoBuscado);
    
    if (resultado === null) {
        imprimir(TipoMensaje.NO_HAY_TAREAS_ESTADO);
        imprimir(TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return tareas;
    } else {
        imprimir(TipoMensaje.LISTA_TAREAS_FILTRADAS, resultado);
        return detalleTarea(tareas);
    }
}

/**
 * Busca y muestra tareas por nombre.
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @param {string} textoBusqueda - El texto a buscar.
 */
export function buscarConIndexOf(tareas: Tarea[], textoBusqueda: string): void {
    const resultado = obtenerTareasEncontradas(tareas, textoBusqueda);
    
    if (resultado === null) {
        imprimir(TipoMensaje.NO_SE_ENCONTRARON_TAREAS);
    } else {
        imprimir(TipoMensaje.LISTA_TAREAS_FILTRADAS, resultado);
    }
}

/**
 * Maneja el menú de ver tareas con sus opciones.
 * @param {Tarea[]} tareas - El arreglo de tareas.
 * @returns {Tarea[]} El array de tareas (potencialmente modificado).
 */
export function manejarVerTareas(tareas: Tarea[]): Tarea[] {
    imprimir(TipoMensaje.MENU_VER_TAREAS, undefined, true);
    
    if (tareas.length === 0) {
        imprimir(TipoMensaje.NO_HAY_TAREAS);
        imprimir(TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return tareas;
    }
    
    const entrada = prompt("Indique la opción: ");
    const opMenuInterno = parseInt(entrada);
    
    switch (opMenuInterno) {
        case 1:
            imprimir(TipoMensaje.LISTA_TAREAS, tareas);
            return detalleTarea(tareas);
        case 2:
            return verTareaFiltro(tareas, Estado.PENDIENTE);
        case 3:
            return verTareaFiltro(tareas, Estado.EN_CURSO);
        case 4:
            return verTareaFiltro(tareas, Estado.TERMINADA);
        case 0:
            return tareas;
        default:
            imprimir(TipoMensaje.OPCION_INVALIDA);
            imprimir(TipoMensaje.PRESIONE_ENTER);
            prompt("");
            return tareas;
    }
}

/**
 * Maneja el proceso de búsqueda de tareas.
 * @param {Tarea[]} tareas - El arreglo de tareas.
 */
export function manejarBuscarTareas(tareas: Tarea[]): void {
    console.clear();
    
    if (tareas.length === 0) {
        imprimir(TipoMensaje.NO_HAY_TAREAS);
        imprimir(TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return;
    }
    
    let entrada = prompt("Ingrese el título de la tarea a buscar: ");
    
    while (entrada.length < 1) {
        imprimir(TipoMensaje.TITULO_INVALIDO);
        entrada = prompt("Ingrese el titulo de la tarea (al menos 1 caracter): ");
    }
    
    buscarConIndexOf(tareas, entrada);
    imprimir(TipoMensaje.PRESIONE_ENTER);
    prompt("");
}