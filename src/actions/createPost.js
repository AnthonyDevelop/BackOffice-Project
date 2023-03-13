import { actionTypes } from "../constantes/actionTypes"

export const setCreatePost= (data) => {
    return {
        type: actionTypes.SET_CREATE_POST,
        data
    }
}

export const respuestaCreatePost = (data) => {
    return {
        type: actionTypes.RESPUESTA_CREATE_POST,
        data
    }
}