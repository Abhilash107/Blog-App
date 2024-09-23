import mongoose from "mongoose";
import {DB_NAME} from './DB_NAME.js'


const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log("MongoDB connection error", error)
        process.exit(1)
        
    }
}

export default connectDB