import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useSignup = () => {
    const {setAuthUser} = useAuthContext();
    const [loading, setLoading] = useState(false);
    const signup = async({fullName, username, password, confirmPassword, gender})=>{
    const success = handleInputErrors({fullName, username, password, confirmPassword, gender})
        if(!success) return;
        setLoading(true);
        try{
            //using signup route to post the signup info to backend
            //storing the res in the res variable after sending post req
            const res = await fetch("/api/auth/signup", {
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            //local storage
            localStorage.setItem("chat-user", JSON.stringify(data));
            //context
            setAuthUser(data);
            console.log(data);
        }catch(err){
            toast.error(err.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading, signup};
}

export default useSignup

function handleInputErrors({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill all the feilds');
        return false;
    }
    if(password!==confirmPassword){
        toast.error('Passwords do not match');
        return false;
    }
    if(password.length <6){
        toast.error('Password must be longer than 5 characters')
        return false;
    }
    return true;
}