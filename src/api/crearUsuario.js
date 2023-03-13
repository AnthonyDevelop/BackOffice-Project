import apiInstance from './api'

export const apiCrearUsuario = (params) => {
    return apiInstance.post('/api/user/crearUsuario', params)
    .then(res =>{
            return res.data;
    })
    .catch(error => {
        console.error(error.response);
        throw error.response
    });
}