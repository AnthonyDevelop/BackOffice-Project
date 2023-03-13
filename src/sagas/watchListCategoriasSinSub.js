import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';
import apiListCategoriaSinSub from "../api/ListCategoriaSinSub";
import { setListCategoriasSinSub } from "../actions/listCategoriaSinSub";

export const watchListCategoriasSinSub  = function * (){
    yield takeEvery(actionTypes.GET_LIST_CATEGORIAS_SIN_SUB, fetchListCategoriasSinSub)
}
function* fetchListCategoriasSinSub (action){
    try{
        const data = yield call(apiListCategoriaSinSub, action.data)
        if(data){
            yield put(setListCategoriasSinSub(data))
        }
    }catch(err){
        console.log(err)
    }
}