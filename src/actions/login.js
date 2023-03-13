import { actionTypes } from "../constantes/actionTypes"; 

export const verificarLogin = (data) => {
    return {
        type: actionTypes.VERIFICAR_INGRESO_LOGIN,
        data
    }
}

export const resultVerificar = (data) => {
    return {
        type: actionTypes.RESULT_VERIFICAR_LOGIN,
        data
    }
}

export const setLogin = (data) => {
    return {
        type: actionTypes.SET_LOGIN,
        data
    }
}

export const respuestaLogin = (data) => {
    return {
        type: actionTypes.RESPUESTA_LOGIN_USUARIO,
        data
    }
}