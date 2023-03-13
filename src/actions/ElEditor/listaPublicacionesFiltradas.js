import { actionTypes } from "../../constantes/actionTypes"

export const setRecibirPostsFiltrados = (data) => {
    return {
        type: actionTypes.SET_RECIBIR_PUBLICACIONES_FILTRADAS,
        data
    }
}

export const getRecibirPostsFiltrados = (data) => {
    return {
        type: actionTypes.GET_RECIBIR_PUBLICACIONES_FILTRADAS,
        data
    }
}