import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';

import apiSubirArchivos from "../api/apiSubirArchivos";
import { respuestaSubirArchivo } from "../actions/subirArchivos";

export const watchSubirArchivos  = function * (){
    yield takeEvery(actionTypes.SET_SUBIR_ARCHIVO, fetchSubirArchivos)
}
function* fetchSubirArchivos (action){
    try{
        const data = yield call(apiSubirArchivos, action.data)
        if(data){
            yield put(respuestaSubirArchivo(data))
        }
    }catch(err){
        console.log(err)
    }
}