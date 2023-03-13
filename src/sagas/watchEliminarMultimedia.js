import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put} from'redux-saga/effects';
import { getEliminarMultimedia } from "../actions/eliminarMultimedia";
import apiEliminarMultimedia from "../api/eliminarMultimedia";

export const watchEliminarMultimedia = function * (){
    yield takeEvery(actionTypes.SET_ELIMINAR_MULTIMEDIA, fetchEliminarMultimedia)
}

function* fetchEliminarMultimedia(action){
    try{
        const data = yield call(apiEliminarMultimedia, action.data)
        if(data){
            yield put(getEliminarMultimedia(data))
        }
    }catch(err){
        console.log(err)
    }
}