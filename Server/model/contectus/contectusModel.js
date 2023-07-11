import mongoose from "mongoose";

const contectUs = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    massage:{type:String},
    status:{type:String,
       default:"pending"
    },

    
},{timestamps:true})

export default mongoose.model("contactus",contectUs)