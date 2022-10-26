import axios from "axios";
import jwtdecode from "jwt-decode";
import  dayjs from "dayjs";
 
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
 
  async (error) => {
   
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    const token = localStorage.getItem('token');
    const decoded = jwtdecode(token);
    const currentTime = dayjs().unix();
    console.log(decoded.exp - currentTime)

    return response;
  }
  ,
  async (error) => {
    
    // get new  token by refresh token
   
    if (error.response.status === 401) {
      const token = localStorage.getItem('token');
      const decoded = jwtdecode(token);
      const currentTime = dayjs().unix();
      if (decoded.exp < currentTime) {
        // renew token

        try {
          const res = await instance.post('/admin/refresh-token', { refreshToken: localStorage.getItem('refreshToken') });
          localStorage.setItem('token', res.data.data.access_token);
          localStorage.setItem('refreshToken', res.data.data.refreshToken);
          error.config.headers['Authorization'] = `Bearer ${res.data.data.access_token}`;
          return await instance(error.config);
        } catch (err) {
          console.log(err);
        }
      }

      // ...
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;