import { actionTypes } from "../constantes/actionTypes"

export const setSumarVisita= (data) => {
    return {
        type: actionTypes.SET_SUMAR_VISITA,
        data
    }
}

