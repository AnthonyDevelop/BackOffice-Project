import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerModoOscuro (state = store.modoOscuro, action){
    switch(action.type){
        case actionTypes.SET_MODO_OSCURO:
            let modoOscuroData = action.data
            return Object.assign({}, state, {
                data: modoOscuroData,
            })
            default:
                return state
    }
}

export default reducerModoOscuro;