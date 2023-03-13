import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';
import apiListMultimedia from "../api/listMultimedia";
import { setListMultimedia } from "../actions/listMultimedia";

export const watchListMultimedia  = function * (){
    yield takeEvery(actionTypes.GET_LIST_MULTIMEDIA, fetchListMultimedia)
}
function* fetchListMultimedia (action){
    try{
        const data = yield call(apiListMultimedia, action.data)
        if(data){
            yield put(setListMultimedia(data))
        }
    }catch(err){
        console.log(err)
    }
}