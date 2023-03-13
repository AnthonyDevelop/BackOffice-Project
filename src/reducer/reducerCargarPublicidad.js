import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerCargarPublicidad (state = store.respuestaCargarPublicidad, action){
    switch(action.type){
        case actionTypes.RESPUESTA_CARGAR_PUBLICIDAD:
            let publicidadData = action.data
            return Object.assign({}, state, {
                data: publicidadData,
            })
            default:
                return state
    }
}
export default reducerCargarPublicidad;    