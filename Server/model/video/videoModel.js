import mongoose from "mongoose";

const mongoSchema =new mongoose.Schema({
   chapterName:{type:String},
   subChapter:{type:String},
   batch:{type:String},
   subject:{type:String},
   videoUrl:{type:String},
   date:{type:Date}
})
export default mongoose.model('recordedvideo',mongoSchema)


