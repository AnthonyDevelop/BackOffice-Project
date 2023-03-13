import apiInstance from './api'

const apiListPostUser = (datos) => {
  return  apiInstance.get('/post/listPostUser/' + datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiListPostUser;