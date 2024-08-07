const User = require('../models/user.model');

const getUsersForSidebar = async(req, res)=>{
    try {
        const loggedInUserId = req.user._id;
        //find all users other than the logged in user (us) but hide their passwords
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
}

module.exports = getUsersForSidebar;