import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerListMultimedia (state = store.listMultimedia, action){
    switch(action.type){
        case actionTypes.SET_LIST_MULTIMEDIA:
            let listMultimediaData = action.data
            return Object.assign({}, state, {
                data: listMultimediaData,
            })
            default:
                return state
    }
}
export default reducerListMultimedia;    