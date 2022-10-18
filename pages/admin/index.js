import { useRouter} from "next/router";
import { useEffect } from "react";

// Redirects to Dashboard
export default () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/admin/dashboard");
    })
}