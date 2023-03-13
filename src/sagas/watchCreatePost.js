import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';

import apiCreatePost from "../api/createPost";
import { respuestaCreatePost } from "../actions/createPost";

export const watchCreatePost  = function * (){
    yield takeEvery(actionTypes.SET_CREATE_POST, fetchCreatePost)
}
function* fetchCreatePost (action){
    try{
        const data = yield call(apiCreatePost, action.data)
        if(data){
            yield put(respuestaCreatePost(data))
        }
    }catch(err){
        console.log(err)
    }
}