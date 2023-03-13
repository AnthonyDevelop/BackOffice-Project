import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';
import apiEliminarPost from "../api/eliminarPost";
import { respuestaEliminarPost } from "../actions/eliminarPost";

export const watchEliminarPost  = function * (){
    yield takeEvery(actionTypes.SET_ELIMINAR_POST, fetchEliminarPost)
}
function* fetchEliminarPost (action){
    try{
        const data = yield call(apiEliminarPost, action.data)
        if(data){
            yield put(respuestaEliminarPost(data))
        }
    }catch(err){
        console.log(err)
        yield put(respuestaEliminarPost(err))
    }
}