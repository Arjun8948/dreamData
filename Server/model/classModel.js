import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
    },
    boardUrl: {
      type: String,
    },
    boardName: {
      type: String,
    },
    price: {
      type: String,
    },

    className: {
      type: String,
    },
    start: {
      type: String,
    },
    status: {
      type: String,
      default: false,
    },
    subject: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("class", classSchema);
