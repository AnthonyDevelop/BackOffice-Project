import apiInstance from './api'

const apiSumarVisita = (datos) => {
  return  apiInstance.get('/post/view/' + datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiSumarVisita;