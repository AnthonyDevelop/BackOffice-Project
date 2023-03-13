import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';

import { setRoleUser } from "../actions/roleUser";
import apiRoleUser from "../api/roleUser";

export const watchRoleUser  = function * (){
    yield takeEvery(actionTypes.GET_ROLE_USER, fetchRoleUser)
}
function* fetchRoleUser (action){
    try{
        const data = yield call(apiRoleUser, action.data)
        if(data){
            yield put(setRoleUser(data))
        }
    }catch(err){
        console.log(err)
    }
}