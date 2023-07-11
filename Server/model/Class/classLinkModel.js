import mongoose from "mongoose";

const classLinkSchema = new mongoose.Schema({
  chapterName: {
    type: String,
  },
  subChapter: {
    type: String,
  },
  batch: {
    type: String,
  },
  subject: {
    type: String,
  },
  classLink: {
    type: String,
  },
  date: {
    type: Date,
  },
  instructorId: {
    type: String,
    default: null,
  },
});
export default mongoose.model("classLink", classLinkSchema);
