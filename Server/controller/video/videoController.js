import mongoose from "mongoose";
import error from "../../error.js";
import videoModel from "../../model/video/videoModel.js"

export const addVideo = async(req,res,next)=>{
    const url = req.protocol + '://' + req.get('host')
   const {chapterName,subChapter,batch,subject,date,videoUrl} = req.body;
   if(!chapterName || !subChapter || !batch ||!subject ||!videoUrl||!date){
    return next(error(400,"All filed is required!"))
   }
  try {
    const newVideo = await videoModel.create({
        ...req.body
     })
     res.status(200).json({newVideo,massage:"video upload sucessfully"})
    } catch (err) {
         next(err)
    }
}




export const getVideo = async(req,res,next)=>{
   const batch =  req.query.batch;
   const subject =  req.query.subject;
   
   try {
      if(batch && subject){
        const Video  = await videoModel.find({$and:[{batch:batch},{subject:subject}]}).sort({date:-1});
        if(!Video) return next(error(404,"video not found!"))
         res.status(200).json(Video)
        }else{
        const Video  = await videoModel.find({});
        if(!Video) return next(error(404,"video not found!")).sort({date:-1})
         res.status(200).json(Video) 
        }
    } catch (err) {
         next(err)
    }
}

export const deleteVideo = async(req,res,next)=>{
     const videoId = req.body.id;
    try {
      const video = await videoModel.findByIdAndDelete(videoId);
       if(!video) return next(error(404,"video not found"))
     res.status(200).json({massage:"video delete sucessfully"})
        
    } catch (err) {
         next(err)
    }
}












