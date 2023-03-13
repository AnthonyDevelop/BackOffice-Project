import apiInstance from './api'

const apiSubirArchivos = (datos) => {
  return  apiInstance.post('/post/uploadFile',datos, { headers:{"Content-Type": "multipart/form-data"}})

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiSubirArchivos;

