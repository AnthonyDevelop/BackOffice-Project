import { actionTypes } from "../constantes/actionTypes"; 

export const setEliminarPost = (data) => {
    return {
        type: actionTypes.SET_ELIMINAR_POST,
        data
    }
}

export const respuestaEliminarPost = (data) => {
    return {
        type: actionTypes.RESPUESTA_ELIMINAR_POST,
        data
    }
}