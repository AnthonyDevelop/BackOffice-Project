import { actionTypes } from "../constantes/actionTypes"; 

export const setCrearUsuario = (data) => {
    return {
        type: actionTypes.CREAR_USUARIO,
        data
    }
}
