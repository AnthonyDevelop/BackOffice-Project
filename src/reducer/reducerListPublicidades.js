import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerListPublicidades(state = store.listPublicidades, action){
    switch(action.type){
        case actionTypes.SET_LIST_PUBLICIDADES:
            let listPublicidadesData = action.data
            return Object.assign({}, state, {
                data: listPublicidadesData,
            })
            default:
                return state
    }
}
export default reducerListPublicidades;    