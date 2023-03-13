import apiInstance from './api'

const apiDataUser = (datos) => {
  return  apiInstance.get('/api/user/perfilUser',datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiDataUser;