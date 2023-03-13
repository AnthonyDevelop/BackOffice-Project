import { actionTypes } from "../constantes/actionTypes"; 

export const getDataPost = (data) => {
    return {
        type: actionTypes.GET_DATA_POST,
        data
    }
}

export const setDataPost = (data) => {
    return {
        type: actionTypes.SET_DATA_POST,
        data
    }
}