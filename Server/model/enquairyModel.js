import mongoose from "mongoose";

const enquariySchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    number: {
        type: String
    },
    massage: {
        type: String
    },
    status: {
        type: String,
        default: "pending"
    }
}, {timestamps: true})

export default mongoose.model("enquairies", enquariySchema)






