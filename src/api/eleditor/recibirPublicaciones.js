import apiInstance from '../api'

export const apiRecibirPublicaciones = (params) => {
    return apiInstance.post('/post/listPostHome',params)
    .then(res =>{
            return res.data;
    })
    .catch(error => {
        console.error(error.response);
        throw error.response
    });
}