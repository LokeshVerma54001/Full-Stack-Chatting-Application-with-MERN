import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const logout = async ()=>{
        setLoading(true);
        try {
            await fetch("/api/auth/logout", {
                method:"POST",
                headers: {"Content-Type":"application/json"}
            })
            localStorage.removeItem("chat-user");
            setAuthUser(null);

        } catch (err) {
            toast.error(err.message);

        }finally{
            setLoading(false);
        }
    }
    return {loading, logout};
}

export default useLogout