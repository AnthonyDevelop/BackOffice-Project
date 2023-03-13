import apiInstance from './api'

const apiEliminarMultimedia = (datos) => {
  return  apiInstance.post('/api/post/deleteFile' ,datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiEliminarMultimedia;