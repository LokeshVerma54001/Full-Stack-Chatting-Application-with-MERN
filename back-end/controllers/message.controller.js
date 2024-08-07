const Conversation = require("../models/conversation.model");
const Message = require('../models/message.model');

const sendMessage = async(req, res)=>{
    try{
        const {message} = req.body;
        const {id:receiverId} = req.params;
        //this user id came from the protectRoute middleware
        const senderId = req.user._id;
        
        let conversation = await Conversation.findOne({
    //find a conversation where participants
    //includes senderId and receiverId feilds
            participants:{
                $all:[senderId, receiverId]
            }
        })

        if(!conversation){
            //if conversation doesnt exists then create one
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        //SOCKET IO Functionality will go here

        //saveing message and conversation in the db
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
}

const getMessage = async(req, res) =>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        //this will populate the conversation with 
        //messages between user id's
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId, userToChatId]}
        }).populate("messages");//not reffrence but actuall messages
        if(!conversation){
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(conversation.messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
}

module.exports = {sendMessage, getMessage};