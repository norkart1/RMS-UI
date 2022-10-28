import { useRouter} from "next/router";
import { useEffect } from "react";

// Redirects to Dashboard
export default function Redirect () {
    const router = useRouter();
    useEffect(() => {
        router.push("/auth/login");
    })
}