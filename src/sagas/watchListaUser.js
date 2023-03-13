import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';

import apiListUser from "../api/listUser";
import { setListUser } from "../actions/listUser";

export const watchListUser = function * (){
    yield takeEvery(actionTypes.GET_LISTA_USUARIOS, fetchListUser)
}
function* fetchListUser (action){
    try{
        const data = yield call(apiListUser, action.data)
        if(data){
            yield put(setListUser(data))
        }
    }catch(err){
        console.log(err)
    }
}