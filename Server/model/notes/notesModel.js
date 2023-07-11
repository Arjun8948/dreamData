import mongoose from "mongoose";

const notesSchema =new mongoose.Schema({
   chapterName:{type:String},
   subChapter:{type:String},
   batch:{type:String},
   subject:{type:String},
   notesUrl:{type:String},
   date:{type:Date}

})
export default mongoose.model('notes',notesSchema)










