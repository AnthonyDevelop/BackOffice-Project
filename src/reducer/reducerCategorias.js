import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerCategorias (state = store.categorias, action){
    switch(action.type){
        case actionTypes.SET_RECIBIR_CATEGORIAS:
            let listCategorias = action.data
            return Object.assign({}, state, {
                data: listCategorias,
            })
            default:
                return state
    }
}
export default reducerCategorias;    