import apiInstance from './api'

const apiEliminarPost = (datos) => {
  return  apiInstance.post('/api/post/deletePosts' ,datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiEliminarPost;