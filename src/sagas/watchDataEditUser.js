import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put} from'redux-saga/effects';
import apiDataEditarUser from "../api/dataEditarUser";
import { respuestaEditarUser } from "../actions/dataUser";

export const watchEditarUser  = function * (){
    yield takeEvery(actionTypes.SET_EDITAR_USUARIO, fetchEditar)
}

function* fetchEditar (action){
    try{
        const data = yield call(apiDataEditarUser, action.data)
        if(data){
            yield put(respuestaEditarUser(data))
        }
    }catch(err){
        console.log(err)
        yield put(respuestaEditarUser(err))
    }
}