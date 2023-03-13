import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';
import { setEditarPost } from "../actions/editarPost";
import apiEditarPost from "../api/editarPost";

export const watchEditarPost  = function * (){
    yield takeEvery(actionTypes.GET_EDITAR_POST, fetchEditarPost)
}
function* fetchEditarPost (action){
    try{
        const data = yield call(apiEditarPost , action.data)
        if(data){
            yield put(setEditarPost(data))
        }
    }catch(err){
        console.log(err)
    }
}