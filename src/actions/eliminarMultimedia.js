import { actionTypes } from "../constantes/actionTypes"; 

export const setEliminarMultimedia = (data) => {
    return {
        type: actionTypes.SET_ELIMINAR_MULTIMEDIA,
        data
    }
}
export const getEliminarMultimedia = (data) => {
    return {
        type: actionTypes.GET_ELIMINAR_MULTIMEDIA,
        data
    }
}