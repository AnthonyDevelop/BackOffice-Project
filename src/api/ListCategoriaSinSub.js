import apiInstance from './api'

const apiListCategoriaSinSub = (datos) => {
  return  apiInstance.post('/categoria/listCategoriasSinSub',datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiListCategoriaSinSub;