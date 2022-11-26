import { useRouter} from "next/router";
import { useEffect } from "react";
import baseApi from "../api/baseApi";

// Redirects to Dashboard
export default function Redirect () {
    const router = useRouter();

    useEffect(() => {
        // check if user has token
        if (localStorage.getItem("token")) {
            // check if user is admin
            baseApi.get("/admin/user").then((res) => {
                if(res.data.success) {
                    router.push("/admin/dashboard");
                } 
            }).catch(
                (err) => {
                 
                    baseApi.get("/user/me").then((res) => {
                        if(res.data.success) {
                            router.push("/control");
                        }
                    }).catch((err) => {
                        

                        
                            baseApi.get("/coordinator/me").then((res) => {
                                if(res.data.success) {
                                    router.push("/portal/candidates");
                                }
                            }).catch((err) => {
                              
                               
                                    router.push("/auth/login");
                                }
                            )
                            });
                        }
                    )
                   
                  
           
        } else {
            router.push("/auth/login");
        }
    }, []);






    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    )
}

   