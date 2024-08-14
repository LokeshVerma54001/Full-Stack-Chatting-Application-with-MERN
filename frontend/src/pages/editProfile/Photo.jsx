
const Photo = ({handleFileChange, handlePhotoClick}) => {
  const local = localStorage.getItem('chat-user');
  const data = JSON.parse(local);
  return (
    <div className="flex flex-col justify-start gap-5">
      <div className="avatar cursor-pointer" onClick={handlePhotoClick}>
        <div className="w-24 rounded-full">
          <img src={data.profilePic} alt="User's Profile" />
        </div>
      </div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  )
}

export default Photo