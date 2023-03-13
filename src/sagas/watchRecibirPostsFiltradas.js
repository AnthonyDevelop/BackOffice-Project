import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';
import { apiRecibirPublicacionesFiltradas } from "../api/eleditor/recibirPublicacionesFiltradas";
import { setRecibirPostsFiltrados } from "../actions/ElEditor/listaPublicacionesFiltradas";

export const watchRecibirPostsFiltrados  = function * (){
    yield takeEvery(actionTypes.GET_RECIBIR_PUBLICACIONES_FILTRADAS, fetchRecibirPostFiltrados)
}
function* fetchRecibirPostFiltrados (action){
    try{
        const data = yield call(apiRecibirPublicacionesFiltradas, action.data)
        if(data){
            yield put(setRecibirPostsFiltrados(data))
        }
    }catch(err){
        console.log(err)
    }
}