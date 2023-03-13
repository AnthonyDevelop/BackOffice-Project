import apiInstance from './api'

const apiCargarPublicidad = (datos) => {
  return  apiInstance.post('/api/pu/updatePu',datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiCargarPublicidad;