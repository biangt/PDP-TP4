"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatoFecha = formatoFecha;
exports.control = control;
exports.mostrarDificultad = mostrarDificultad;
exports.mostrarEstado = mostrarEstado;
exports.obtenerMensaje = obtenerMensaje;
exports.imprimir = imprimir;
const types_js_1 = require("./types.js");
// FUNCIONES PURAS - Formateo y transformación
/**
 * Formatea una fecha a formato legible (función pura).
 * @param {Date} fecha - La fecha a formatear.
 * @returns {string} La fecha formateada.
 */
function formatoFecha(fecha) {
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
function control(entrada) {
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
function mostrarDificultad(dificultad) {
    switch (dificultad) {
        case types_js_1.Dificultad.FACIL:
            return "⭐ Fácil";
        case types_js_1.Dificultad.MEDIA:
            return "⭐⭐ Media";
        case types_js_1.Dificultad.DIFICIL:
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
function mostrarEstado(estado) {
    switch (estado) {
        case types_js_1.Estado.PENDIENTE:
            return "⏳ Pendiente";
        case types_js_1.Estado.EN_CURSO:
            return "🔄 En Curso";
        case types_js_1.Estado.TERMINADA:
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
function obtenerMensaje(tipo, datos) {
    switch (tipo) {
        case types_js_1.TipoMensaje.MENU_PRINCIPAL:
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
        case types_js_1.TipoMensaje.MENU_VER_TAREAS:
            return `¿Que tareas deseas ver?

                        ╔═══════════════════════════════════╗
                        ║      [1] Todas                    ║
                        ║      [2] Pendientes               ║
                        ║      [3] En curso                 ║
                        ║      [4] Terminadas               ║
                        ║      [0] Salir                    ║
                        ╚═══════════════════════════════════╝`;
        case types_js_1.TipoMensaje.NO_HAY_TAREAS:
            return "No hay tareas cargadas";
        case types_js_1.TipoMensaje.TITULO_INVALIDO:
            return "Titulo invalido o vacio, intentelo de nuevo";
        case types_js_1.TipoMensaje.OPCION_INVALIDA:
            return "-OPCIÓN NO VALIDA-";
        case types_js_1.TipoMensaje.DESPEDIDA:
            return "Hasta la próxima!";
        case types_js_1.TipoMensaje.PRESIONE_ENTER:
            return "Presione enter para continuar";
        case types_js_1.TipoMensaje.LISTA_TAREAS:
            if (datos && Array.isArray(datos) && datos.length > 0) {
                return datos.map((tarea, index) => `Tarea N° [${index + 1}]: ${tarea.nombre}`).join('\n');
            }
            return "";
        case types_js_1.TipoMensaje.NO_HAY_TAREAS_ESTADO:
            return "No hay tareas con ese estado";
        case types_js_1.TipoMensaje.NO_SE_ENCONTRARON_TAREAS:
            return "No se encontraron tareas con ese nombre";
        case types_js_1.TipoMensaje.LISTA_TAREAS_FILTRADAS:
            if (datos && typeof datos === 'object' && 'tareas' in datos && 'indicesOriginales' in datos) {
                const datosCompletos = datos;
                return datosCompletos.tareas.map((tarea, i) => `Tarea N° [${datosCompletos.indicesOriginales[i] + 1}]: ${tarea.nombre}`).join('\n');
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
function imprimir(tipo, datos, limpiarPantalla = false) {
    if (limpiarPantalla) {
        console.clear();
    }
    const mensaje = obtenerMensaje(tipo, datos);
    console.log(mensaje);
}
//# sourceMappingURL=utils.js.map