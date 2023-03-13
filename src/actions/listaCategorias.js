import { actionTypes } from "../constantes/actionTypes"

export const setCrearCategoria= (data) => {
    return {
        type: actionTypes.SET_CREAR_CATEGORIA,
        data
    }
}

export const setRecibirCategorias= (data) => {
    return {
        type: actionTypes.SET_RECIBIR_CATEGORIAS,
        data
    }
}

export const getRecibirCategorias = (data) => {
    return {
        type: actionTypes.GET_RECIBIR_CATEGORIAS,
        data
    }
}

export const setEliminarCategoria= (data) => {
    return {
        type: actionTypes.SET_ELIMINAR_CATEGORIA,
        data
    }
}

export const respuestaCrearCategoria= (data) => {
    return {
        type: actionTypes.RESPUESTA_CREAR_CATEGORIA,
        data
    }
}