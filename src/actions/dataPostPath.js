import { actionTypes } from "../constantes/actionTypes"; 

export const setDataPostPath = (data) => {
    return {
        type: actionTypes.SET_DATA_POST_PATH,
        data
    }
}

export const getDataPostPath = (data) => {
    return {
        type: actionTypes.GET_DATA_POST_PATH,
        data
    }
}