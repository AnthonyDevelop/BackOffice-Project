import apiInstance from './api'

const apiListUser = (datos) => {
  return  apiInstance.post('/api/user/listUsers',datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiListUser;