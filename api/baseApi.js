import axios from "axios";

const instance = axios.create({
  baseURL: process.env.MY_BASE_URL,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});
export default instance;