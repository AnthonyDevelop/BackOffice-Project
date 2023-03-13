import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put} from'redux-saga/effects';
import apiCargarPublicidad from "../api/apiCargarPublicidad";
import { respuestaCargarPublicidad } from "../actions/cargarPublicidad";

export const watchCargarPublicidad  = function * (){
    yield takeEvery(actionTypes.SET_CARGAR_PUBLICIDAD, fetchCargarPublicidad)
}

function* fetchCargarPublicidad(action){
    try{
        const data = yield call(apiCargarPublicidad, action.data)
        if(data){
            yield put(respuestaCargarPublicidad(data))
        }
    }catch(err){
        console.log(err)
    }
}