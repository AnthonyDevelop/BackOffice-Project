import apiInstance from './api'

const apiListPublicidades = (datos) => {
  return  apiInstance.get('/pu/listPu',datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiListPublicidades;