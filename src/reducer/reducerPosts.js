import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerPosts (state = store.postsHome, action){
    switch(action.type){
        case actionTypes.SET_RECIBIR_PUBLICACIONES:
            let listPosts = action.data
            return Object.assign({}, state, {
                data: listPosts,
            })
            default:
                return state
    }
}
export default reducerPosts;    