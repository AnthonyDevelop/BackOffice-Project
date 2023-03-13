import apiInstance from './api'

const apiDataEditarUser = (datos) => {
  return  apiInstance.post('/api/user/updateUser',datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiDataEditarUser;