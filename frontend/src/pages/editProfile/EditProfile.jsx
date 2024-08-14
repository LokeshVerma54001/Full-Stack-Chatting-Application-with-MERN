import { useState } from "react";
import EditMenu from "./EditMenu"
import Photo from "./Photo"


const EditProfile = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]); // Store the selected file in state
    }
  };

  const handlePhotoClick = () => {
    document.getElementById('fileInput').click(); // Programmatically click the hidden file input
  };
  return (
    <div className="flex flex-col items-center justify-center max-w-sm min-w-96
    mx-auto">
        <div className="gap-5 w-full p-6 rounded-lg shadow-md bg-gray-400 flex justify-center items-center
        bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 flex-col">
            <h2 className="text-2xl w-fu">Edit Profile</h2>
                <Photo
                  handleFileChange={handleFileChange}
                  handlePhotoClick={handlePhotoClick}
                />
                <EditMenu 
                  selectedFile = {selectedFile}
                />
        </div>
    </div>
  )
}

export default EditProfile