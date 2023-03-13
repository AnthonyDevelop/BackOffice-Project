import { actionTypes } from "../constantes/actionTypes"


export const setModoOscuro = (data) => {
    return {
        type: actionTypes.SET_MODO_OSCURO,
        data
    }
}