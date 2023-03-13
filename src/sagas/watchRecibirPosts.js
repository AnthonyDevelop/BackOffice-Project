import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';
import { apiRecibirPublicaciones } from "../api/eleditor/recibirPublicaciones";
import { setRecibirPosts } from "../actions/ElEditor/listaPublicaciones";

export const watchRecibirPosts  = function * (){
    yield takeEvery(actionTypes.GET_RECIBIR_PUBLICACIONES, fetchRecibirPost)
}
function* fetchRecibirPost (action){
    try{
        const data = yield call(apiRecibirPublicaciones, action.data)
        if(data){
            yield put(setRecibirPosts(data))
        }
    }catch(err){
        console.log(err)
    }
}