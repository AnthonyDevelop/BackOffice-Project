import apiInstance from './api'

const apiListPostGeneral = (datos) => {
  return  apiInstance.post('/post/listPostGeneral',datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default apiListPostGeneral;