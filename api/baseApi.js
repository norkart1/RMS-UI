import axios from "axios";
import {  refreshToken } from "../helpers/auth";


let instance = axios.create({
  baseURL: process.env.BASE_URL,
})
instance.interceptors.request.use(

  (config) => {
    // Do something before request is sent

    config.headers = {
      "Content-Type": "application/json",
      "Authorization":  localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null,
    }
  
    return config;
  },
  // axios interceper  for delete request




  async (error) => {
    // Do something with request error
    refreshToken();
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