const User = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require("../utils/generateToken.js");

const signup = async(req, res) =>{
    try{
        const {fullName, username, password, confirmPassword, gender} =req.body;
        if(password!==confirmPassword){
            return res.status(400).json({error:"Password don't match"});
        }
        //if user already exists then---
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"Username already exists"});
        }

        //hash passwords here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const boyProfilePic =  `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        //creating a new variable for schema
        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic:gender=="male"?
                boyProfilePic: girlProfilePic
        })
        //saving the new file in mongo
        if(newUser){
            //generate GWT token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic    
            });
        }else{
            res.status(400).json({error:"invalid user data"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const login = async(req, res) =>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        });
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const logout = (req, res) =>{
    try{
        res.cookie("jwt","", {maxAge:0});
        res.status(200).json({message:"Logged Out Successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
}


module.exports = {login, logout, signup};