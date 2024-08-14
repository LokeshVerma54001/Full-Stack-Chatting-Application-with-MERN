import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditButton = () => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/editProfile');
    }
  return (
    <div className="flex items-center">
        <FaCog onClick={handleClick}
        className="w-5 h-5 text-white cursor-pointer"/>
    </div>
  )
}

export default EditButton