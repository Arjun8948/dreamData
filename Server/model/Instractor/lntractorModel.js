import mongoose from "mongoose";


const InstractorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    subject: {
        type: String
    },
    joining: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    profileImg: {
        type: String
    },
    subscription:{
        type:String,
        default:false
    },
    present:{type:Number,
      default:0},
    absent:{type:Number,
     default:0 
    },

},{timestamps:true})
export default mongoose.model("Instractor", InstractorSchema)





