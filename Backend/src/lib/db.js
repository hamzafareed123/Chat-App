import mongoose from "mongoose";

const dbConnect = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Error in Connecting Database",error);
    }
}

export default dbConnect;


