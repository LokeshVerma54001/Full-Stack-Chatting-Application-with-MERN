import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext";
import useEdit from "../../hooks/useEdit";
import { useNavigate } from 'react-router-dom';



const EditMenu = ({selectedFile}) => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [password, setPassword] = useState("");
    const {authUser} = useAuthContext("");
    const navigate = useNavigate();
    const {loading, edit} = useEdit();

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("submit called");
        edit(fullname, username, newPassword, password, selectedFile);
        navigate('/');
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2 w-full items-center">
            <div className="flex flex-col items-start gap-1 w-full">
                <label>Full Name</label>
                <input content={fullname} onChange={(e)=>setFullname(e.target.value)}
                 type="text" placeholder={authUser.fullName}
                className=" input input-bordered h-10 w-full" />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
                <label>User Name</label>
                <input content={username} onChange={(e)=>setUsername(e.target.value)}
                type="text" placeholder={authUser.username} 
                className=" input input-bordered h-10 w-full"/>
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
                <label>Change Password</label>
                <input content={newPassword} onChange={(e)=>setNewPassword(e.target.value)}
                type="password" placeholder="New Password" 
                className=" input input-bordered h-10 w-full"/>
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
                <label>Previous Password</label>
                <input content={password} onChange={(e)=>setPassword(e.target.value)}
                type="password" placeholder="Previous Password" 
                className=" input input-bordered h-10 w-full"/>
            </div>
        </div>
        <button type="submit" className="mt-5 btn btn-sm btn-block border border-slate-700">Submit</button>
    </ form>
  )
}

export default EditMenu