import axios from "axios";

let instance = axios.create({
  baseURL: process.env.BASE_URL,
})
instance.interceptors.request.use(
  // console.log("now we will refresh token in response 1"),

  (config) => {
    // Do something before request is sent
    config.headers = {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null,
    }
    return config;
  },
  // axios interceper  for delete request




  async (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  async (response) => {
    // Do something with response data

    return response;
  }
  ,
  async (error) => {


    return Promise.reject(error);
  }
);

export default instance;