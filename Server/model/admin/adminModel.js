import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  token: {
    type: String,
    default: false,
  },
  adminType: {
    type: String,
    default: "root",
  },
  state: {
    type: String,
    default: "none",
  },
  joining: {
    type: String,
    default: "none",
  },
});
export default mongoose.model("admin", adminSchema);
