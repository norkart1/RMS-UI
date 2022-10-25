import baseApi from '../api/baseApi';
import {useAuth} from './useAuth';

const useRefreshToken = () => {
  const {setAuth} = useAuth();
  const refresh = async () => {
    
      const response = await baseApi.post('/refresh-token',{
        withCredentials: true
      });
      setAuth( prev => {
        console.log(JSON.stringify(response.data));
        console.log(response.data.access_token);
        return {
          ...prev,
          accessToken: response.data.access_token,}
        });
        return response.data.access_token;
      }
    return  refresh;
  };

  
  export default useRefreshToken;