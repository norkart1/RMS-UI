import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 100000,
  headers: { 
    "Content-Type": "application/json",
    "Accept": "application/json",
    // 'Authorization': `Bearer ${typeof localStorage != undefined && localStorage.getItem('token')}`
}
});
export default instance;