import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerListaUser (state = store.listaUsuarios, action){
    switch(action.type){
        case actionTypes.SET_LISTA_USUARIOS:
            let dataUsuarios = action.data
            return Object.assign({}, state, {
                data: dataUsuarios,
            })
            default:
                return state
    }
}

export default reducerListaUser;