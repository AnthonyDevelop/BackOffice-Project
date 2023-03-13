import apiInstance from './api'

const apiCreatePost = (datos) => {
  return  apiInstance.post('/api/post/createPost',datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiCreatePost;