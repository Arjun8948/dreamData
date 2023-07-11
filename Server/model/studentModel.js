import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({


    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String
    },
    phone: {
        type: String
    },

   className: {
        type: String
    },

    boardName: {
        type: String
    },

    password: {
        type: String
    },

    batch: {
        type: String,
        default:null
    },
    avatar: {
        type: String
    },
    enroll:{
      type:String,
      default:false
    },
    price:{
        type:String,
    },
    batchStatus:{
        type:String,
        default:false 
    },
    enrollId:{
        type:String,
        
    },
    start:{
        type:String,
        default:null
    }

}, {timestamps: true})

export default mongoose.model("studentdata", studentSchema)



