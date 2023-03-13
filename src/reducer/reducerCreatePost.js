import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerRespuestaCreatePost (state = store.respuestaCreatePost, action){
    switch(action.type){
        case actionTypes.RESPUESTA_CREATE_POST:
            let respuestaCreatePostData = action.data
            return Object.assign({}, state, {
                data: respuestaCreatePostData,
            })
            default:
                return state
    }
}
export default reducerRespuestaCreatePost;    