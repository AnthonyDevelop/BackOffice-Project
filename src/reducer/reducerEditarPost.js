import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerEditarPost (state = store.editarPost, action){
    switch(action.type){
        case actionTypes.SET_EDITAR_POST:
            let dataEditar = action.data
            return Object.assign({}, state, {
                data: dataEditar,
            })
            default:
                return state
    }
}

export default reducerEditarPost;