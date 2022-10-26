import { useRouter} from "next/router";
import { useEffect } from "react";

// Redirects to Dashboard
export default Redirect  = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/portal/dashboard");
    })
}