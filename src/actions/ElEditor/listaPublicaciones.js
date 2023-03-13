import { actionTypes } from "../../constantes/actionTypes"

export const setRecibirPosts = (data) => {
    return {
        type: actionTypes.SET_RECIBIR_PUBLICACIONES,
        data
    }
}

export const getRecibirPosts = (data) => {
    return {
        type: actionTypes.GET_RECIBIR_PUBLICACIONES,
        data
    }
}