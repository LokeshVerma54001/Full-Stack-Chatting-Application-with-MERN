const express = require('express');
const dotenv = require('dotenv');
const { connect } = require('mongoose');
const cookieParser = require('cookie-parser');

const messageRoutes = require('./routes/message.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const connectToMongoDB = require('./db/connectToMongoDB');
const {app, server} = require('./socket/socket');

dotenv.config();
const PORT = process.env.PORT || 5000;

//to parse the incoming requests with JSON payload from (req.body)
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//now we are using socket server instead of express alone,
//so we are gonna listen for the socket server
server.listen(PORT, () =>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});