import { useState } from "react"
import toast from "react-hot-toast";


const useEdit = () => {

    const [loading, setLoading] = useState(false);
    
    const edit = async(fullname, username, newPassword, password, selectedFile)=>{
        setLoading(true);
        try{
            const res = await fetch('/api/edit', {
                method:'PUT',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    fullName:fullname,
                    username:username,
                    password:password,
                    newPassword:newPassword,
                    profilePic:selectedFile
                })
            });
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            localStorage.removeItem('chat-user');
            localStorage.setItem('chat-user', JSON.stringify(data));
            toast.success("Profile Edit Successfully")
        }catch(error){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {edit, loading};
}

export default useEdit