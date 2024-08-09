const {Server} = require('socket.io');
const http = require('http');
const express = require('express');

//adding socket server on top of our express server 
//to add real time working
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET", "POST"]
    }
});

//returns socket id of receiver form the socket map
const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap = {};//{userId: socketId}


io.on("connection", (socket)=>{
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId!=="undefined") userSocketMap[userId] = socket.id;

    //io.emit() is used to send events to all the connected clients
    //we need this to check who is online or not
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    //socket.on() method is used to listen to the events, can be used
    //both on client and server side
    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id)
        //deletes userId from the userSocket map after he is disconnected
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

module.exports = {app, io, server, getReceiverSocketId};