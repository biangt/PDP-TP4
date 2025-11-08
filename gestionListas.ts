import promptSync from 'prompt-sync';
import { Tarea } from './tarea.js';
import { Estado, TipoMensaje } from './types.js';
import { detalleYEdicionTarea } from './gestionTareas.js';
import { imprimir } from './utils.js';

const prompt = promptSync({ sigint: true });

// ============================================
// FUNCIONES PURAS - Transformaciones de datos
// ============================================

/**
 * Agrega una tarea al arreglo de tareas de forma INMUTABLE.
 */
export function agregarTareaALista(tareas: Tarea[], nuevaTarea: Tarea): Tarea[] {
    return [...tareas, nuevaTarea];
}

/**
 * Filtra tareas por estado (función pura).
 */
export function filtrarTareasPorEstado(tareas: Tarea[], estadoBuscado: Estado): Tarea[] {
    return tareas.filter(function(tarea) {
        return tarea.estado === estadoBuscado;
    });
}

/**
 * Busca tareas que contengan un texto en su nombre (función pura).
 */
export function buscarTareasPorNombre(tareas: Tarea[], textoBusqueda: string): Tarea[] {
    const textoBusquedaLower = textoBusqueda.toLowerCase();
    return tareas.filter(function(tarea) {
        return tarea.nombre.toLowerCase().indexOf(textoBusquedaLower) !== -1;
    });
}

/**
 * Reemplaza una tarea en el array original usando su ID (función pura).
 * NUEVA: Esta función compone los cambios de vuelta al array original.
 */
export function reemplazarTareaEnListaOriginal(
    tareasOriginales: Tarea[], 
    tareaEditada: Tarea
): Tarea[] {
    return tareasOriginales.map(function(tarea) {
        return tarea.id === tareaEditada.id ? tareaEditada : tarea;
    });
}

/**
 * Obtiene las tareas filtradas por estado (función pura).
 */
export function obtenerTareasFiltradas(
    tareas: Tarea[], 
    estadoBuscado: Estado
): Tarea[] | null {
    const tareasFiltradas = filtrarTareasPorEstado(tareas, estadoBuscado);
    return tareasFiltradas.length === 0 ? null : tareasFiltradas;
}

/**
 * Busca tareas por nombre (función pura).
 */
export function obtenerTareasEncontradas(
    tareas: Tarea[], 
    textoBusqueda: string
): Tarea[] | null {
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
export function verTareaFiltro(tareas: Tarea[], estadoBuscado: Estado): Tarea[] {
    const tareasFiltradas = obtenerTareasFiltradas(tareas, estadoBuscado);
    
    if (tareasFiltradas === null) {
        imprimir(TipoMensaje.NO_HAY_TAREAS_ESTADO);
        imprimir(TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return tareas;
    }
    
    // Mostrar solo las tareas filtradas
    imprimir(TipoMensaje.LISTA_TAREAS, tareasFiltradas);
    
    // Permitir ver detalle SOLO de las tareas filtradas
    const tareaEditadaONull = detalleYEdicionTarea(tareasFiltradas);
    
    // Si se editó una tarea, componerla de vuelta al array original
    if (tareaEditadaONull !== null) {
        return reemplazarTareaEnListaOriginal(tareas, tareaEditadaONull);
    }
    
    return tareas;
}

/**
 * Busca y muestra tareas por nombre.
 */
export function buscarConIndexOf(tareas: Tarea[], textoBusqueda: string): void {
    const tareasEncontradas = obtenerTareasEncontradas(tareas, textoBusqueda);
    
    if (tareasEncontradas === null) {
        imprimir(TipoMensaje.NO_SE_ENCONTRARON_TAREAS);
    } else {
        imprimir(TipoMensaje.LISTA_TAREAS, tareasEncontradas);
    }
}

/**
 * Maneja el menú de ver tareas con sus opciones.
 */
export function manejarVerTareas(tareas: Tarea[]): Tarea[] {
    if (tareas.length === 0) {
        imprimir(TipoMensaje.NO_HAY_TAREAS);
        imprimir(TipoMensaje.PRESIONE_ENTER);
        prompt("");
        return tareas;
    }
    
    imprimir(TipoMensaje.MENU_VER_TAREAS, undefined, true);
    
    const entrada = prompt("Indique la opción: ");
    const opMenuInterno = parseInt(entrada);
    
    switch (opMenuInterno) {
        case 1: {
            imprimir(TipoMensaje.LISTA_TAREAS, tareas);
            const tareaEditadaONull = detalleYEdicionTarea(tareas);
            return tareaEditadaONull !== null 
                ? reemplazarTareaEnListaOriginal(tareas, tareaEditadaONull)
                : tareas;
        }
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