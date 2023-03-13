import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put} from'redux-saga/effects';
import apiListPublicidades from "../api/apiListPublicidades";
import { setListPublicidades } from "../actions/listPublicidades";

export const watchListPublicidades  = function * (){
    yield takeEvery(actionTypes.GET_LIST_PUBLICIDADES, fetchListPublicidad)
}

function* fetchListPublicidad(action){
    try{
        const data = yield call(apiListPublicidades, action.data)
        if(data){
            yield put(setListPublicidades(data))
        }
    }catch(err){
        console.log(err)
    }
}