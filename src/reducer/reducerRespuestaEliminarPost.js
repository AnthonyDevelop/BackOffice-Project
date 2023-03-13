import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerRespuestaEliminarPost (state = store.respuestaEliminarPost, action){
    switch(action.type){
        case actionTypes.RESPUESTA_ELIMINAR_POST:
            let rptaEliminarUser = action.data
            return Object.assign({}, state, {
                data: rptaEliminarUser,
            })
            default:
                return state
    }
}
export default reducerRespuestaEliminarPost;    