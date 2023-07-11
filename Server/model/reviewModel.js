import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
   name: {
        type: String
    },
    profileLogo :{
        type: String
    },
    designation: {
        type: String
    },
    massage: {
        type: String
    },
    rating: {
        type:Number
    }

}, {timestamps: true})

export default mongoose.model("review", reviewSchema)

