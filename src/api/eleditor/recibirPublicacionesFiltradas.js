import apiInstance from '../api'

export const apiRecibirPublicacionesFiltradas = (params) => {
    return apiInstance.post('/post/listPostGeneral',params)
    .then(res =>{
            return res.data;
    })
    .catch(error => {
        console.error(error.response);
        throw error.response
    });
}