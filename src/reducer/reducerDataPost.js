import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerDataPost (state = store.dataPost, action){
    switch(action.type){
        case actionTypes.SET_DATA_POST:
            let dataPosteo = action.data
            return Object.assign({}, state, {
                data: dataPosteo,
            })
            default:
                return state
    }
}

export default reducerDataPost;