import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerRespuestaCategoria (state = store.respuestaCategoria, action){
    switch(action.type){
        case actionTypes.RESPUESTA_CREAR_CATEGORIA:
            let rptaCategoria = action.data
            return Object.assign({}, state, {
                data: rptaCategoria,
            })
            default:
                return state
    }
}
export default reducerRespuestaCategoria;    