import { useEffect } from "react";
import baseApi from "../../api/baseApi";

export default function checkRefresh() {
  var now = new Date().valueOf();

  useEffect(() => {
    let refreshToken = localStorage.getItem("refreshToken");
    let expire = localStorage.getItem("expiresIn");

    var diff = expire - now;

    if (diff < 0) {
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
      console.log("not expired");
    }
  }, [now]);
}
