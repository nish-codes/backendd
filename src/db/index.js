import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

export const connectDb = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        console.log(`Connected to ${DB_NAME} database successfully`);
    }
    catch(err){
        console.error(`Error connecting to ${DB_NAME} database:`, err)
        process.exit(1);
    }
}