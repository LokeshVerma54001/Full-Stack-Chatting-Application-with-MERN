const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");

const edit = async (req, res) => {
    try {
        console.log("edit route called");
        const { fullName, username, newPassword, password, profilePic } = req.body;   
        if (!password) return res.status(400).json({ error: "Password is required to update the values" });
        // const confirmPassword = bcryptjs.compare
        const authUserId = req.user._id;
        const user = await User.findOne({ _id: authUserId });
        if (!user) return res.status(404).json({ error: "User not found" });
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) return res.status(400).json({error:"Invalid Password"});
        const updates = {};
        if(fullName) updates.fullName = fullName;
        if(username && username !== user.username){
            const userTaken = await User.findOne({username});
            if(userTaken){
                return res.status(400).json({error:"Username already taken"});
            }
            updates.username = username;
        }
        if(newPassword){
            const salt = await bcryptjs.genSalt(10);
            updates.password = await bcryptjs.hash(newPassword , salt);
        }
        if(profilePic){
            updates.profilePic = profilePic;
        }
        const updatedUser = await User.findOneAndUpdate(
            {_id: authUserId},
            {$set: updates},
            {new: true} // return the updated document
        )
        res.status(200).json(
            {
                _id:updatedUser._id,
                fullName:updatedUser.fullName,
                username:updatedUser.username,
                profilePic:updatedUser.profilePic
            }
        );
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Duplicate key error: " + JSON.stringify(error.keyValue) });
        }
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
};

module.exports = edit;
