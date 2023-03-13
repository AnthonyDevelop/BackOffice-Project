import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerListCategoriaSinSub (state = store.listCategoriaSinSub, action){
    switch(action.type){
        case actionTypes.SET_LIST_CATEGORIAS_SIN_SUB:
            let listCategoriasSinSubData = action.data
            return Object.assign({}, state, {
                data: listCategoriasSinSubData,
            })
            default:
                return state
    }
}
export default reducerListCategoriaSinSub;    