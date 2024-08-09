const mongoose = require('mongoose');

const connectToMongoDB = async ()=>{
    try{    
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connected to MongoDB");
    }catch(err){
        console.log(err.message);
    }
}

module.exports = connectToMongoDB;