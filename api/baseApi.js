import axios from "axios";
 
 let instance = axios.create({
  baseURL: process.env.BASE_URL,
})
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers = {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null,
    }
    return config;
  },
 
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  }
  ,
  async (error) => {
    
    // get new  token by refresh token
    if (error.response.status === 401 && localStorage.getItem('refreshToken')) {
      try {
        const res = await instance.post('/admin/refresh-token', { refreshToken: localStorage.getItem('refreshToken') });
        localStorage.setItem('token', res.data.data.access_token);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        error.config.headers['Authorization'] = `Bearer ${res.data.data.access_token}`;
        return await instance(error.config);
      } catch (err) {
        console.log(err);
      }
    }
     
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;