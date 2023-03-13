import { actionTypes } from '../constantes/actionTypes';
import { takeEvery, call, put } from'redux-saga/effects';
import { apiRecibirPublicaciones } from "../api/eleditor/recibirPublicaciones";
import { setRecibirPostsOeste } from "../actions/listPostOeste";

export const watchRecibirPostsOeste  = function * (){
    yield takeEvery(actionTypes.GET_RECIBIR_PUBLICACIONES_OESTE, fetchRecibirPostOeste)
}
function* fetchRecibirPostOeste (action){
    try{
        const data = yield call(apiRecibirPublicaciones, action.data)
        if(data){
            yield put(setRecibirPostsOeste(data))
        }
    }catch(err){
        console.log(err)
    }
}