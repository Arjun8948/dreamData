import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
   imgUrl: {
        type: String
    },
   featureName:{
     type: String
   }
    
}, {timestamps: true})

export default mongoose.model("feature", featureSchema)

