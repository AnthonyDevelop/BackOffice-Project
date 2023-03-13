import { actionTypes } from "../constantes/actionTypes";
import { takeEvery, call, put } from 'redux-saga/effects';
import loginService from "../api/login";
import { resultVerificar } from "../actions/login";
import { verificarLogin } from "../actions/login";
import { respuestaLogin } from "../actions/login";

export const watchLogin = function* () {
    yield takeEvery(actionTypes.RESULT_VERIFICAR_LOGIN, fetchLoginUser)
}

function* fetchLoginUser(action) {
    try {
        const data = yield call(loginService, action.data)
        if (data) {
            yield put(respuestaLogin(true))
            console.log(data)
            yield put(resultVerificar(data))
            // yield put(verificarLogin(data))
        }
    } catch (err) {
        console.log(err)
        yield put(respuestaLogin(false))
    }
}