import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put} from'redux-saga/effects';
import { apiCrearUsuario } from "../api/crearUsuario";
import { respuestaEditarUser } from "../actions/dataUser";

export const watchCrearUsuario  = function * (){
    yield takeEvery(actionTypes.CREAR_USUARIO, fetchCrearUsuario)
}

function* fetchCrearUsuario (action){
    try{
        const data = yield call(apiCrearUsuario, action.data)
        if(data){
            yield put(respuestaEditarUser(data))
        }
    }catch(err){
        console.log(err)
        yield put(respuestaEditarUser(err))
    }
}