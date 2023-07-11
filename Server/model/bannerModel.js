import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    imgUrl:{
        type:String
    }
})

export default mongoose.model("banner",bannerSchema)
