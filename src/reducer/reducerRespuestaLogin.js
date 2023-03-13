import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerRespuestaLogin (state = store.respLoginUser, action){
    switch(action.type){
        case actionTypes.RESPUESTA_LOGIN_USUARIO:
            let rptaLoginUsuario = action.data
            return Object.assign({}, state, {
                data: rptaLoginUsuario,
            })
            default:
                return state
    }
}
export default reducerRespuestaLogin;    