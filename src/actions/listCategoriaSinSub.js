import { actionTypes } from "../constantes/actionTypes"; 

export const getListCategoriasSinSub = (data) => {
    return {
        type: actionTypes.GET_LIST_CATEGORIAS_SIN_SUB,
        data
    }
}

export const setListCategoriasSinSub = (data) => {
    return {
        type: actionTypes.SET_LIST_CATEGORIAS_SIN_SUB,
        data
    }
}