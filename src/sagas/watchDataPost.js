import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';
import { setDataPost } from "../actions/dataPost";

export const watchDataPost  = function * (){
    yield takeEvery(actionTypes.GET_DATA_POST, fetchDataPost)
}
function* fetchDataPost (action){
    try{
        const data = yield call(action.data)
        if(data){
            yield put(setDataPost(data))
        }
    }catch(err){
        console.log(err)
        yield put(setDataPost(err))
    }
}