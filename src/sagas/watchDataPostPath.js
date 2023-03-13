import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put} from'redux-saga/effects';
import dataPostPath from "../api/dataPostPath";
import { setDataPostPath } from "../actions/dataPostPath";

export const watchDataPostPath  = function * (){
    yield takeEvery(actionTypes.GET_DATA_POST_PATH, fetchDataPostPath)
}

function* fetchDataPostPath (action){
    try{
        const data = yield call(dataPostPath, action.data)
        if(data){
            yield put(setDataPostPath(data))
        }
    }catch(err){
        console.log(err)
        console.log("HOLAAAAAAAAA")
        yield put(setDataPostPath("la ruta no existe"))
      
    }
}