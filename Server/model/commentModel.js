import mongoose from "mongoose";

const blogPostCommentSchema =new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    
    },
    PostId: {
        type: String,
        required: true,
   
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model("postComment",blogPostCommentSchema)