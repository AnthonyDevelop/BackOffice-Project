import apiInstance from './api'

const apiListMultimedia = (datos) => {
  return  apiInstance.post('/api/files/listFiles',datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiListMultimedia;