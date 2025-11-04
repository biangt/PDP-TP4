export enum Estado {
    PENDIENTE = 1,
    EN_CURSO = 2,
    TERMINADA = 3
}

export enum Dificultad {
    FACIL = 1,
    MEDIA = 2,
    DIFICIL = 3
}

export enum TipoMensaje {
    MENU_PRINCIPAL,
    MENU_VER_TAREAS,
    NO_HAY_TAREAS,
    TITULO_INVALIDO,
    OPCION_INVALIDA,
    DESPEDIDA,
    PRESIONE_ENTER,
    LISTA_TAREAS,
    NO_HAY_TAREAS_ESTADO,
    NO_SE_ENCONTRARON_TAREAS,
    LISTA_TAREAS_FILTRADAS
}