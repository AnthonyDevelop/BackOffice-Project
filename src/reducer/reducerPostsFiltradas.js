import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerPostsFiltradas (state = store.postsFiltrados, action){
    switch(action.type){
        case actionTypes.SET_RECIBIR_PUBLICACIONES_FILTRADAS:
            let listPostsF = action.data
            return Object.assign({}, state, {
                data: listPostsF,
            })
            default:
                return state
    }
}
export default reducerPostsFiltradas;    