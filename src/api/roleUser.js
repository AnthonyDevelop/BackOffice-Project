import apiInstance from './api'

const apiRoleUser = (datos) => {
  return  apiInstance.get('/api/roles/listRoles',datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiRoleUser;