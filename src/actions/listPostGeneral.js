import { actionTypes } from "../constantes/actionTypes"

export const setListPostGeneral= (data) => {
    return {
        type: actionTypes.SET_LIST_POST,
        data
    }
}

export const getListPostGeneral = (data) => {
    return {
        type: actionTypes.GET_LIST_POST,
        data
    }
}

export const rtaListPostGeneral = (data) => {
    return {
        type: actionTypes.RESPUESTA_LIST_POST,
        data
    }
}