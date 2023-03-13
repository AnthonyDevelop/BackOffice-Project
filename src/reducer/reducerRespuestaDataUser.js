import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerRespuestaDataUser (state = store.respUser, action){
    switch(action.type){
        case actionTypes.RESPUESTA_USER:
            let rptaDatUser = action.data
            return Object.assign({}, state, {
                data: rptaDatUser,
            })
            default:
                return state
    }
}
export default reducerRespuestaDataUser;    