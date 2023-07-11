import mongoose from "mongoose";

const pdfBookSchema = new mongoose.Schema({
  className: { type: String },
  subjectName: { type: String },
  books: { type: String },
});

export default mongoose.model("books", pdfBookSchema);
