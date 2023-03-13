import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerDataUser (state = store.dataUser, action){
    switch(action.type){
        case actionTypes.SET_USUARIO_DATA:
            let UsuarioData = action.data
            return Object.assign({}, state, {
                data: UsuarioData,
            })
            default:
                return state
    }
}

export default reducerDataUser;