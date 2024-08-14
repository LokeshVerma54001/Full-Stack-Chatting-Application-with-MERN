const express = require('express');
const dotenv = require('dotenv');
const { connect } = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const messageRoutes = require('./routes/message.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const editRoutes = require('./routes/edit.routes');
const connectToMongoDB = require('./db/connectToMongoDB');
const {app, server} = require('./socket/socket');

dotenv.config();
const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

//to parse the incoming requests with JSON payload from (req.body)
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/edit", editRoutes);

__dirname = path.resolve();

//this is for deployment purpose
//to load static files from the front end(html,css,etc...)
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

//now we are using socket server instead of express alone,
//so we are gonna listen for the socket server
server.listen(PORT, () =>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});