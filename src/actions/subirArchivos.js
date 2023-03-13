import { actionTypes } from "../constantes/actionTypes"

export const setSubirArchivo= (data) => {
    return {
        type: actionTypes.SET_SUBIR_ARCHIVO,
        data
    }
}

export const respuestaSubirArchivo= (data) => {
    return {
        type: actionTypes.RESPUESTA_SUBIR_ARCHIVO,
        data
    }
}
