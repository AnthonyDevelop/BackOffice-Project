
import { actionTypes } from "../constantes/actionTypes";
import { store } from "../store/index";

function reducerRespuestaSubirArchivo (state = store.respuestaSubirArchivos, action){
    switch(action.type){
        case actionTypes.RESPUESTA_SUBIR_ARCHIVO:
            let respuestaSubirArchivosData = action.data
            return Object.assign({}, state, {
                data: respuestaSubirArchivosData,
            })
            default:
                return state
    }
}
export default reducerRespuestaSubirArchivo;    