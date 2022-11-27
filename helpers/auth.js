import baseApi from "../api/baseApi";
 

const refreshToken = async () => {
  setInterval(() => {
    var now = new Date().valueOf();
    let refreshToken = localStorage.getItem("refreshToken");
    let expire = localStorage.getItem("expiresIn");
    
    var diff = expire - now;
    


    if (diff < 6000) {
      // get new token
      refreshToken = localStorage.getItem("refreshToken");

      baseApi
        .post("/user/refresh-token", {
          refreshToken: refreshToken,
        })
        .then((data) => {
          if (data.status === 201) {
            localStorage.setItem("token", data.data.data.access_token);
            localStorage.setItem("refreshToken", data.data.data.refresh_token);
            localStorage.setItem("expiresIn", data.data.data.expires_in);
          }
        });
    } else {
      
    }
  }, 3000);
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("refreshToken");
  window.location.href = "/auth/login";
};

export { logout, refreshToken };
