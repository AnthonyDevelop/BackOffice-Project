import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerDataPostPath (state = store.dataPostPath, action){
    switch(action.type){
        case actionTypes.SET_DATA_POST_PATH:
            let dataPostPathData = action.data
            return Object.assign({}, state, {
                data: dataPostPathData,
            })
            default:
                return state
    }
}
export default reducerDataPostPath;    