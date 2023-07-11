import mongoose from "mongoose";

const postCommentSchema = new mongoose.Schema({
    postId:{type:String},
    userId:{type:String},
    comment:{type:String}
},{timestamps:true}) 

export default mongoose.model("postComment",postCommentSchema)

