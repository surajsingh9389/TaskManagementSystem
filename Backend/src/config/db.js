import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        const uri = process.env.MONGO_URI;
        const conn = await mongoose.connect(uri);
        console.log(`MongoDb Connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

export {connectDB};