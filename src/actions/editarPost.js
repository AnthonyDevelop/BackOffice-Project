import { actionTypes } from "../constantes/actionTypes"; 

export const getEditarPost = (data) => {
    return {
        type: actionTypes.GET_EDITAR_POST,
        data
    }
}

export const setEditarPost = (data) => {
    return {
        type: actionTypes.SET_EDITAR_POST,
        data
    }
}