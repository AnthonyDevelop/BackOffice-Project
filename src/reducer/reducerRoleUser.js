import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerRoleUser (state = store.roleUser, action){
    switch(action.type){
        case actionTypes.SET_ROLE_USER:
            let roleUsuario = action.data
            return Object.assign({}, state, {
                data: roleUsuario,
            })
            default:
                return state
    }
}
export default reducerRoleUser;    