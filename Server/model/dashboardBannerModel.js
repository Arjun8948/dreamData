import mongoose from "mongoose";

const dashboardBanner = new mongoose.Schema({
    dashboardBanner:{
        type:String
    }
})

export default mongoose.model("dashboardBanner",dashboardBanner)