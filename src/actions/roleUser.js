import { actionTypes } from "../constantes/actionTypes"

export const setRoleUser = (data) => {
    return {
        type: actionTypes.SET_ROLE_USER,
        data
    }
}

export const getRoleUser = (data) => {
    return {
        type: actionTypes.GET_ROLE_USER,
        data
    }
}