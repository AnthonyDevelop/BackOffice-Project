import { actionTypes } from "../constantes/actionTypes"

export const setListPostUser= (data) => {
    return {
        type: actionTypes.SET_LIST_POST_USER,
        data
    }
}

export const getListPostUser = (data) => {
    return {
        type: actionTypes.GET_LIST_POST_USER,
        data
    }
}