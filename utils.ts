import { Tarea } from './tarea.js';
import { TipoMensaje, Dificultad, Estado } from './types.js';

// FUNCIONES PURAS - Formateo y transformación

/**
 * Formatea una fecha a formato legible (función pura).
 * @param {Date} fecha - La fecha a formatear.
 * @returns {string} La fecha formateada.
 */
export function formatoFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

/**
 * Controla que la entrada esté entre 1 y 3 (función pura).
 * @param {string} entrada - La entrada a validar.
 * @returns {string} La entrada validada o string vacío.
 */
export function control(entrada: string): string {
    const numero = parseInt(entrada);
    if (!isNaN(numero) && numero >= 1 && numero <= 3) {
        return entrada;
    }
    return "";
}

/**
 * Muestra la dificultad con emoji (función pura).
 * @param {Dificultad} dificultad - La dificultad.
 * @returns {string} El texto con emoji.
 */
export function mostrarDificultad(dificultad: Dificultad): string {
    switch (dificultad) {
        case Dificultad.FACIL:
            return "⭐ Fácil";
        case Dificultad.MEDIA:
            return "⭐⭐ Media";
        case Dificultad.DIFICIL:
            return "⭐⭐⭐ Difícil";
        default:
            return "Desconocida";
    }
}

/**
 * Muestra el estado con texto descriptivo (función pura).
 * @param {Estado} estado - El estado.
 * @returns {string} El texto descriptivo.
 */
export function mostrarEstado(estado: Estado): string {
    switch (estado) {
        case Estado.PENDIENTE:
            return "⏳ Pendiente";
        case Estado.EN_CURSO:
            return "🔄 En Curso";
        case Estado.TERMINADA:
            return "✅ Terminada";
        default:
            return "Desconocido";
    }
}

/**
 * Genera el contenido del mensaje según el tipo (función pura).
 * @param {TipoMensaje} tipo - El tipo de mensaje.
 * @param {any} datos - Datos opcionales para el mensaje.
 * @returns {string} El mensaje formateado.
 */
export function obtenerMensaje(tipo: TipoMensaje, datos?: Tarea[] | {tareas: Tarea[], indicesOriginales: number[]}): string {
    switch (tipo) {
        case TipoMensaje.MENU_PRINCIPAL:
            return `
    ██████╗░██╗███████╗███╗░░██╗██╗░░░██╗███████╗███╗░░██╗██╗██████╗░░█████╗░  ░█████╗░██╗░░░░░
    ██╔══██╗██║██╔════╝████╗░██║██║░░░██║██╔════╝████╗░██║██║██╔══██╗██╔══██╗  ██╔══██╗██║░░░░░
    ██████╦╝██║█████╗░░██╔██╗██║╚██╗░██╔╝█████╗░░██╔██╗██║██║██║░░██║██║░░██║  ███████║██║░░░░░
    ██╔══██╗██║██╔══╝░░██║╚████║░╚████╔╝░██╔══╝░░██║╚████║██║██║░░██║██║░░██║  ██╔══██║██║░░░░░
    ██████╦╝██║███████╗██║░╚███║░░╚██╔╝░░███████╗██║░╚███║██║██████╔╝╚█████╔╝  ██║░░██║███████╗
    ╚═════╝░╚═╝╚══════╝╚═╝░░╚══╝░░░╚═╝░░░╚══════╝╚═╝░░╚══╝╚═╝╚═════╝░░╚════╝░  ╚═╝░░╚═╝╚══════╝
    
    ███╗░░░███╗███████╗███╗░░██╗██╗░░░██╗  ██████╗░███████╗  ████████╗░█████╗░██████╗░███████╗░█████╗░░██████╗██╗
    ████╗░████║██╔════╝████╗░██║██║░░░██║  ██╔══██╗██╔════╝  ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝██║
    ██╔████╔██║█████╗░░██╔██╗██║██║░░░██║  ██║░░██║█████╗░░  ░░░██║░░░███████║██████╔╝█████╗░░███████║╚█████╗░██║
    ██║╚██╔╝██║██╔══╝░░██║╚████║██║░░░██║  ██║░░██║██╔══╝░░  ░░░██║░░░██╔══██║██╔══██╗██╔══╝░░██╔══██║░╚═══██╗╚═╝
    ██║░╚═╝░██║███████╗██║░╚███║╚██████╔╝  ██████╔╝███████╗  ░░░██║░░░██║░░██║██║░░██║███████╗██║░░██║██████╔╝██╗
    ╚═╝░░░░░╚═╝╚══════╝╚═╝░░╚══╝░╚═════╝░  ╚═════╝░╚══════╝  ░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═════╝░╚═╝
   
            ╔═══════════════════════════════════╗
            ║     [1] Ver mis tareas            ║
            ║     [2] Buscar mis tareas         ║
            ║     [3] Agregar una tarea         ║
            ║     [0] Salir                     ║
            ╚═══════════════════════════════════╝`;

        case TipoMensaje.MENU_VER_TAREAS:
            return `¿Que tareas deseas ver?

                        ╔═══════════════════════════════════╗
                        ║      [1] Todas                    ║
                        ║      [2] Pendientes               ║
                        ║      [3] En curso                 ║
                        ║      [4] Terminadas               ║
                        ║      [0] Salir                    ║
                        ╚═══════════════════════════════════╝`;

        case TipoMensaje.NO_HAY_TAREAS:
            return "No hay tareas cargadas";

        case TipoMensaje.TITULO_INVALIDO:
            return "Titulo invalido o vacio, intentelo de nuevo";

        case TipoMensaje.OPCION_INVALIDA:
            return "-OPCIÓN NO VALIDA-";

        case TipoMensaje.DESPEDIDA:
            return "Hasta la próxima!";

        case TipoMensaje.PRESIONE_ENTER:
            return "Presione enter para continuar";

        case TipoMensaje.LISTA_TAREAS: 
            if (datos && Array.isArray(datos) && datos.length > 0) {
                return datos.map((tarea: Tarea, index: number) => 
                    `Tarea N° [${index + 1}]: ${tarea.nombre}`
                ).join('\n');
            }
            return "";

        case TipoMensaje.NO_HAY_TAREAS_ESTADO:
            return "No hay tareas con ese estado";

        case TipoMensaje.NO_SE_ENCONTRARON_TAREAS:
            return "No se encontraron tareas con ese nombre";

        case TipoMensaje.LISTA_TAREAS_FILTRADAS:
            //preguntar por tipo datos
            if (datos && typeof datos === 'object' && 'tareas' in datos && 'indicesOriginales' in datos) {
                const datosCompletos = datos as {tareas: Tarea[], indicesOriginales: number[]};
                return datosCompletos.tareas.map((tarea: Tarea, i: number) => 
                    `Tarea N° [${datosCompletos.indicesOriginales[i] + 1}]: ${tarea.nombre}`
                ).join('\n');
            }
            return "";

        default:
            return "";
    }
}

// FUNCIÓN IMPURA - Imprime en pantalla

/**
 * Imprime un mensaje en pantalla según el tipo.
 * @param {TipoMensaje} tipo - El tipo de mensaje.
 * @param {any} datos - Datos opcionales.
 * @param {boolean} limpiarPantalla - Si debe limpiar la pantalla antes.
 */
export function imprimir(tipo: TipoMensaje, datos?: Tarea[] | {tareas: Tarea[], indicesOriginales: number[]}, limpiarPantalla: boolean = false): void {
    if (limpiarPantalla) {
        console.clear();
    }
    const mensaje = obtenerMensaje(tipo, datos);
    console.log(mensaje);
}