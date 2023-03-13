import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';

import apiListPostGeneral from "../api/listPostGeneral";
import { setListPostGeneral } from "../actions/listPostGeneral";
import { rtaListPostGeneral } from "../actions/listPostGeneral";

export const watchListPostGeneral  = function * (){
    yield takeEvery(actionTypes.GET_LIST_POST, fetchListPost)
}
function* fetchListPost (action){
    try{
        const data = yield call(apiListPostGeneral, action.data)
        if(data){
            yield put(setListPostGeneral(data))
            yield put(rtaListPostGeneral(data))
        }
    }catch(err){
        console.log(err)
        yield put(rtaListPostGeneral(err))
    }
}