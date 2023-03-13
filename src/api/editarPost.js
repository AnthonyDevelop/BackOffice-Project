import apiInstance from './api'

const apiEditarPost = (datos) => {
  return  apiInstance.post('/api/post/updatePost' ,datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiEditarPost;