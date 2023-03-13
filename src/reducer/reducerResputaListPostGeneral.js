import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerResputaListPostGeneral (state = store.rtaListPostGeneral, action){
    switch(action.type){
        case actionTypes.RESPUESTA_LIST_POST:
            let rptaPostGeneral = action.data
            return Object.assign({}, state, {
                data: rptaPostGeneral,
            })
            default:
                return state
    }
}
export default reducerResputaListPostGeneral;    