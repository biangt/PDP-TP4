"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoMensaje = exports.Dificultad = exports.Estado = void 0;
var Estado;
(function (Estado) {
    Estado[Estado["PENDIENTE"] = 1] = "PENDIENTE";
    Estado[Estado["EN_CURSO"] = 2] = "EN_CURSO";
    Estado[Estado["TERMINADA"] = 3] = "TERMINADA";
})(Estado || (exports.Estado = Estado = {}));
var Dificultad;
(function (Dificultad) {
    Dificultad[Dificultad["FACIL"] = 1] = "FACIL";
    Dificultad[Dificultad["MEDIA"] = 2] = "MEDIA";
    Dificultad[Dificultad["DIFICIL"] = 3] = "DIFICIL";
})(Dificultad || (exports.Dificultad = Dificultad = {}));
var TipoMensaje;
(function (TipoMensaje) {
    TipoMensaje[TipoMensaje["MENU_PRINCIPAL"] = 0] = "MENU_PRINCIPAL";
    TipoMensaje[TipoMensaje["MENU_VER_TAREAS"] = 1] = "MENU_VER_TAREAS";
    TipoMensaje[TipoMensaje["NO_HAY_TAREAS"] = 2] = "NO_HAY_TAREAS";
    TipoMensaje[TipoMensaje["TITULO_INVALIDO"] = 3] = "TITULO_INVALIDO";
    TipoMensaje[TipoMensaje["OPCION_INVALIDA"] = 4] = "OPCION_INVALIDA";
    TipoMensaje[TipoMensaje["DESPEDIDA"] = 5] = "DESPEDIDA";
    TipoMensaje[TipoMensaje["PRESIONE_ENTER"] = 6] = "PRESIONE_ENTER";
    TipoMensaje[TipoMensaje["LISTA_TAREAS"] = 7] = "LISTA_TAREAS";
    TipoMensaje[TipoMensaje["NO_HAY_TAREAS_ESTADO"] = 8] = "NO_HAY_TAREAS_ESTADO";
    TipoMensaje[TipoMensaje["NO_SE_ENCONTRARON_TAREAS"] = 9] = "NO_SE_ENCONTRARON_TAREAS";
    TipoMensaje[TipoMensaje["LISTA_TAREAS_FILTRADAS"] = 10] = "LISTA_TAREAS_FILTRADAS";
})(TipoMensaje || (exports.TipoMensaje = TipoMensaje = {}));
//# sourceMappingURL=types.js.map