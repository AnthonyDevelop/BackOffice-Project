import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerListPost (state = store.listPost, action){
    switch(action.type){
        case actionTypes.SET_LIST_POST:
            let listaDePost = action.data
            return Object.assign({}, state, {
                data: listaDePost,
            })
            default:
                return state
    }
}
export default reducerListPost;    