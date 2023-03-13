import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';

import apiListPostUser from "../api/listPostUser";
import { setListPostUser } from "../actions/listPostUser";

export const watchListPostUser  = function * (){
    yield takeEvery(actionTypes.GET_LIST_POST_USER, fetchListPostUser)
}
function* fetchListPostUser (action){
    try{
        const data = yield call(apiListPostUser, action.data)
        if(data){
            yield put(setListPostUser(data))
        }
    }catch(err){
        console.log(err)
    }
}