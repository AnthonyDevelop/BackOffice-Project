import apiInstance from './api'

const dataPostPath = (datos) => {
  return  apiInstance.get('' + datos)

  .then(res => { 
    return res.data;
    
  }).catch(error => {
    console.error(error.response);
    throw error.response
  });
}

export default dataPostPath;