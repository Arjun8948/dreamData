import mongoose from "mongoose";

const dashboardBanner = new mongoose.Schema({
    bannerImg: {
        type: String
    }
})
export default mongoose.model("dashboardbanner", dashboardBanner)
