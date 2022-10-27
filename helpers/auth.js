import jwtdecode from "jwt-decode";
import dayjs from "dayjs";
import baseApi from '../api/baseApi';


const refreshToken = async () => {
  if(localStorage.getItem('token')){
  const token = localStorage.getItem('token');
  const decoded = jwtdecode(token);
  const currentTime = dayjs().unix();
  if (decoded.exp - currentTime < 60) {
  try {
    const res = await baseApi.post('/admin/refresh-token',{
      refreshToken: localStorage.getItem('refreshToken')
    }  )
    console.log("refesh token");
      localStorage.setItem('token', res.data.data.access_token);
      localStorage.setItem('refreshToken', res.data.data.refresh_token);
      // return res.data.data.access_token;
    } catch (err) {
      console.log(err);
    }
  }
}
}


const logout = () => {

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('refreshToken');
  window.location.href = '/auth/login';
}

export {  logout , refreshToken};