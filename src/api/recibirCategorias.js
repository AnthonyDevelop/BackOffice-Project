import apiInstance from './api'

export const apiRecibirCategorias = (params) => {
    return apiInstance.post('/categoria/listCategorias', params)
    .then(res =>{
            return res.data;
    })
    .catch(error => {
        console.error(error.response);
        throw error.response
    });
}

export const apiCrearCategoria = (params) => {
    return apiInstance.post('/api/categoria/agregarCategoria', params)
    .then(res =>{
            return res.data;
    })
    .catch(error => {
        console.error(error.response);
        throw error.response
    });
}

export const apiEliminarCategoria = (params) => {
    return apiInstance.post('/api/categoria/deleteCategorias', params)
    .then(res =>{
            return res.data;
    })
    .catch(error => {
        console.error(error.response);
        throw error.response
    });
}