import { useRouter } from "next/router";
import { useEffect } from "react";
import baseApi from "../../api/baseApi";

// Redirects to Dashboard
export default function Redirect() {
  const router = useRouter();
  useEffect(() => {
    baseApi.get('/user/me').then((res) => {
      if (res.data.data.role == '1') {
        router.push("/control/final-mark-entry");
      } else if (res.data.data.role == '2') {
        router.push("/volunteer/add-judge");
      } else if (res.data.data.role == '3') {
        router.push('/media/dashboard');
      }
    }
    )
      
  }, []); 
  return (
    <div>
      <div
        div
        style={{
          width: "100%",
          height: "50rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <img src="/assets/gif/loading.gif" alt="" width={"10%"} />{" "}
    
      </div>
    </div>
  );
}