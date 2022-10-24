import axios from "axios";

export default axios.create({
  baseURL: process.env.BASE_URL,
})
    // check token from localstorage
    // "Authorization": localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null,

    
    // 'Authorization': `Bearer ${typeof localStorage != undefined && localStorage.getItem('token')}`
 
export const axiosPrivate = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",},
    withCredentials: true

})