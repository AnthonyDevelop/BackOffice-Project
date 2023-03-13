import { actionTypes } from "../constantes/actionTypes"; 

export const getDataUser = (data) => {
    return {
        type: actionTypes.GET_USUARIO_DATA,
        data
    }
}

export const setDataUser = (data) => {
    return {
        type: actionTypes.SET_USUARIO_DATA,
        data
    }
}

export const setEditarUser = (data) => {
    return {
        type: actionTypes.SET_EDITAR_USUARIO,
        data
    }
}

export const respuestaEditarUser = (data) => {
    return {
        type: actionTypes.RESPUESTA_EDITAR_USER,
        data
    }
}

export const respuestaDataUser = (data) => {
    return {
        type: actionTypes.RESPUESTA_USER,
        data
    }
}