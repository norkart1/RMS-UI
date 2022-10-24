const refreshTokens = async () => {
  // check expires of token 
  let expire = localStorage.getItem('check_expires')

  let now = new Date()
  let now_time = now.getTime()
  let expires_time = expire
  let expires_in = expires_time * 1000
  let expires_date = new Date(expires_in)
  let expires_date_time = expires_date.getTime()
  let time = expires_date_time - now_time
  // console.log(expire)
  if (time < 0) {
    console.log('token expired')
    const token = localStorage.getItem('token');
    const refreshToken =  localStorage.getItem('refreshToken')
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      token: token,
      refreshToken: refreshToken,
      user: user,
    };
    const newToken = await baseApi({
      method: 'post',
      url: '/admin/refresh-token/',
      data: data,
    })
      .then((res) => res.data)
      .catch((e) => {
        setError({ isError: true, message: e.message });
        return;
      }
      );
    if (newToken) {
      const decoded = jwt_decode(newToken.data.access_token);
      localStorage.setItem('token', newToken.data.access_token);
      localStorage.setItem('user', JSON.stringify(decoded));
      return newToken.data.access_token;
    }
  }

}



const logout = () => {

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
}

export { refreshTokens, logout };