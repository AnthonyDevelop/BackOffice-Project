import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';
import apiSumarVisita from "../api/sumarVisita";

export const watchSumarVisita  = function * (){
    yield takeEvery(actionTypes.SET_SUMAR_VISITA, fetchSumarVisita)
}
function* fetchSumarVisita (action){
    try{
        const data = yield call(apiSumarVisita, action.data)
        if(data){
        
        }
    }catch(err){
        console.log(err)
    }
}