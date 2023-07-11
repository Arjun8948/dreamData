import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  chapterName: { type: String },
  subChapter: { type: String },
  batch: { type: String },
  subject: { type: String },
  assignmentUrl: { type: String },
  date: { type: Date },
});
export default mongoose.model("assignment", assignmentSchema);
