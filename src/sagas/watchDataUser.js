import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';
import apiDataUser from "../api/dataUser";
import { setDataUser } from "../actions/dataUser";
import { respuestaDataUser } from "../actions/dataUser";

export const watchDataUser  = function * (){
    yield takeEvery(actionTypes.GET_USUARIO_DATA, fetchDataUser)
}
function* fetchDataUser (action){
    try{
        const data = yield call(apiDataUser, action.data)
        if(data){
            yield put(setDataUser(data))
        }
    }catch(err){
        console.log(err)
    }
}