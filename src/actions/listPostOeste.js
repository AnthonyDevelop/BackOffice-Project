import { actionTypes } from "../constantes/actionTypes"

export const setRecibirPostsOeste = (data) => {
    return {
        type: actionTypes.SET_RECIBIR_PUBLICACIONES_OESTE,
        data
    }
}

export const getRecibirPostsOeste = (data) => {
    return {
        type: actionTypes.GET_RECIBIR_PUBLICACIONES_OESTE,
        data
    }
}