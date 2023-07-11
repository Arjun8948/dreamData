import mongoose from "mongoose";

const testExam =new mongoose.Schema({
     batch:{type:String},
     subject:{type:String},
     chapter :{type:String},
     date:{type:String},
     link:{type:String}
},{timestamps:true})

export default mongoose.model("test",testExam)