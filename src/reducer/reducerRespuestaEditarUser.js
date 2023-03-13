import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerRespuestaEditUser (state = store.respuestaEditarUser, action){
    switch(action.type){
        case actionTypes.RESPUESTA_EDITAR_USER:
            let rptaEditarUser = action.data
            return Object.assign({}, state, {
                data: rptaEditarUser,
            })
            default:
                return state
    }
}
export default reducerRespuestaEditUser;    