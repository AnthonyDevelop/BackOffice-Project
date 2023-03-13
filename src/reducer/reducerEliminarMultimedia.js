import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerEliminarMultimedia (state = store.respuestaEliminarMultimedia, action){
    switch(action.type){
        case actionTypes.GET_ELIMINAR_MULTIMEDIA:
            let dataEliminarMultimedia = action.data
            return Object.assign({}, state, {
                data: dataEliminarMultimedia,
            })
            default:
                return state
    }
}

export default reducerEliminarMultimedia;