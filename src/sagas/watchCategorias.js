import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from'redux-saga/effects';
import { apiRecibirCategorias, apiCrearCategoria, apiEliminarCategoria } from "../api/recibirCategorias"; 
import { setRecibirCategorias } from "../actions/listaCategorias";
import { respuestaCrearCategoria } from "../actions/listaCategorias";

export const watchCategorias  = function * (){
    yield takeEvery(actionTypes.GET_RECIBIR_CATEGORIAS, fetchRecibirCategorias)
}
function* fetchRecibirCategorias (action){
    try{
        const data = yield call(apiRecibirCategorias, action.data)
        if(data){
            yield put(setRecibirCategorias(data))
        }
    }catch(err){
        console.log(err)
    }
}

export const watchCrearCategorias  = function * (){
    yield takeEvery(actionTypes.SET_CREAR_CATEGORIA, fetchCrearCategorias)
}
function* fetchCrearCategorias (action){
    try{
        const data = yield call(apiCrearCategoria, action.data)
        if(data){
            yield put(respuestaCrearCategoria(data))
        }
    }catch(err){
        yield put(respuestaCrearCategoria(err))
    }
}

export const watchEliminarCategoria  = function * (){
    yield takeEvery(actionTypes.SET_ELIMINAR_CATEGORIA, fetchEliminarCategorias)
}
function* fetchEliminarCategorias (action){
    try{
        const data = yield call(apiEliminarCategoria, action.data)
        if(data){
            yield put(respuestaCrearCategoria(data))
        }
    }catch(err){
        console.log(respuestaCrearCategoria)
        yield put(respuestaCrearCategoria(err))
    }
}











