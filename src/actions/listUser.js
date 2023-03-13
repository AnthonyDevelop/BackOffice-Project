import { actionTypes } from "../constantes/actionTypes"

export const setListUser= (data) => {
    return {
        type: actionTypes.SET_LISTA_USUARIOS,
        data
    }
}

export const getListUser = (data) => {
    return {
        type: actionTypes.GET_LISTA_USUARIOS,
        data
    }
}