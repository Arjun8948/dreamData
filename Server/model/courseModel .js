import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({

    imageUrl: {
        type: String
    },
    boardUrl: {
        type: String
    },
    boardName: {
        type: String
    },
    price: {
        type: String
    },
    start: {
        type: String
    },
    subject:{
        type: String
    },
    status:{
        type: String
        
    }
}, {timestamps: true})

export default mongoose.model("course", courseSchema)


