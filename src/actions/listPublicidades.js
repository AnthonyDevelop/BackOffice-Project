import { actionTypes } from "../constantes/actionTypes"


export const getListPublicidades= (data) => {
    return {
        type: actionTypes.GET_LIST_PUBLICIDADES,
        data
    }
}

export const setListPublicidades = (data) => {
    return {
        type: actionTypes.SET_LIST_PUBLICIDADES,
        data
    }
}