import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerListPostOeste (state = store.listPostOeste, action){
    switch(action.type){
        case actionTypes.SET_RECIBIR_PUBLICACIONES_OESTE:
            let listaDePostOeste = action.data
            return Object.assign({}, state, {
                data: listaDePostOeste,
            })
            default:
                return state
    }
}
export default reducerListPostOeste;    