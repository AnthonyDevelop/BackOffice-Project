import { actionTypes } from "../constantes/actionTypes"

export const setListMultimedia= (data) => {
    return {
        type: actionTypes.SET_LIST_MULTIMEDIA,
        data
    }
}

export const getListMultimedia = (data) => {
    return {
        type: actionTypes.GET_LIST_MULTIMEDIA,
        data
    }
}