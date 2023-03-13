import axios from "axios";

// const BASE_URL = "https://editor.fourcapital.com.ar/server/public";
const BASE_URL = "http://127.0.0.1:8000";

const apiInstance = axios.create({ baseURL: BASE_URL });

apiInstance.interceptors.request.use((request) => {
  request.headers = {
    Authorization: `Bearer ` + localStorage.getItem("token"),
  };
  return request;
});

apiInstance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.data.message === "Expired JWT Token") {
      localStorage.clear();
      window.location = "/login";
    }

    if (err.response.data.message === "Invalid credentials.") {
      localStorage.setItem("dataToken", "esta todo mal")
    }

    return Promise.reject(err.response.data);
  }
);

export default apiInstance;
