import { actionTypes } from "../constantes/actionTypes"


export const setCargarPublicidad= (data) => {
    return {
        type: actionTypes.SET_CARGAR_PUBLICIDAD,
        data
    }
}

export const respuestaCargarPublicidad = (data) => {
    return {
        type: actionTypes.RESPUESTA_CARGAR_PUBLICIDAD,
        data
    }
}