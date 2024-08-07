const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId:{
        //user id reffrence from User model
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true,
    } //created at/updated at
},{timestamps:true});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;