import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerListPostUser(state = store.listPostUser, action) {
    switch (action.type) {
        case actionTypes.SET_LIST_POST_USER:
            let listaPostUsuario = action.data
            return Object.assign({}, state, {
                data: listaPostUsuario,
            })
        default:
            return state
    }
}
export default reducerListPostUser;    