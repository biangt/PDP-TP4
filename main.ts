import promptSync from 'prompt-sync';
import { Tarea } from './tarea.js';
import { TipoMensaje } from './types.js';
import { crearTareaConDatos } from './gestionTareas.js';
import { manejarVerTareas, manejarBuscarTareas, agregarTareaALista } from './gestionListas.js';
import { imprimir } from './utils.js';

const prompt = promptSync({ sigint: true });


// FUNCIONES PURAS
/**
 * Procesa la opción seleccionada y retorna el nuevo estado de tareas.
 * @param {number} opcion - La opción del menú.
 * @param {Tarea[]} tareas - El array de tareas actual.
 * @returns {Tarea[]} El nuevo array de tareas.
 */
function procesarOpcion(opcion: number, tareas: Tarea[]): Tarea[] {
    switch (opcion) {
        case 1:
            return tareas; // Ver no modifica (se maneja en ejecutarAccionSegunOpcion)
        case 2:
            return tareas; // Buscar no modifica
        case 3: {
            const nuevaTarea = crearTareaConDatos();
            return agregarTareaALista(tareas, nuevaTarea);
        }
        default:
            return tareas;
    }
}

// FUNCIONES IMPURAS

/**
 * Muestra el menú principal.
 */
function mostrarMenuPrincipal(): void {
    imprimir(TipoMensaje.MENU_PRINCIPAL);
}

/**
 * Ejecuta acciones según la opción (side effects).
 * @param {number} opcion - La opción del menú.
 * @param {Tarea[]} tareas - El array de tareas.
 * @returns {Tarea[]} El array de tareas (potencialmente modificado).
 */
function ejecutarAccionSegunOpcion(opcion: number, tareas: Tarea[]): Tarea[] {
    switch (opcion) {
        case 1:
            return manejarVerTareas(tareas);
        case 2:
            manejarBuscarTareas(tareas);
            return tareas;
        case 3:
            // La lógica ya está en procesarOpcion
            return tareas;
        default:
            imprimir(TipoMensaje.OPCION_INVALIDA);
            imprimir(TipoMensaje.PRESIONE_ENTER);
            prompt("");
            return tareas;
    }
}

// FUNCIÓN PRINCIPAL
/**
 * Función principal del programa.
 */
function main(): void {
    //cambiar a const tareas = [] para evitar mutaciones dsp
    let tareas: Tarea[] = [];
    let opcion = -1; 

    while (opcion !== 0) {
        console.clear();
        mostrarMenuPrincipal();
        opcion = parseInt(prompt("Ingrese la opción: "));

        if (opcion === 0) {
            imprimir(TipoMensaje.DESPEDIDA);
        } else {
            // Primero ejecutar acciones (pueden modificar tareas si hay edición)
            tareas = ejecutarAccionSegunOpcion(opcion, tareas);
            // Luego procesar la opción (agregar nueva tarea)
            tareas = procesarOpcion(opcion, tareas);
        }
    }
}

main();