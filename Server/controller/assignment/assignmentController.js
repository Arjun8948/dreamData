import mongoose from "mongoose";
import error from "../../error.js";
import assignmentModel from "../../model/assignment/assignmentModel.js"

export const addAssignment = async(req,res,next)=>{
   
   const {chapterName,subChapter,batch,subject,date} = req.body;
   if(!chapterName || !subChapter || !batch ||!subject ||!req.file ||!date){
    return next(error(400,"All filed is required!"))
   }
   const url = req.protocol + '://' + req.get('host')

  try {
    const newAssignment = await assignmentModel.create({
        ...req.body,
        assignmentUrl:url + '/upload/' + req.file.filename,
    
    })
     res.status(200).json({newAssignment,massage:"assignment upload sucessfully"})
    } catch (err) {
         next(err)
    }
}


export const getAssignment = async(req,res,next)=>{
   const batch =  req.query.batch;
   const subject =  req.query.subject;
   
   try {
      if(batch && subject){
        const assignment  = await assignmentModel.find({$and:[{batch:batch},{subject:subject}]}).sort({date:-1});
        if(!Notes) return next(error(404,"Assignment not found!"))
         res.status(200).json(assignment)
        }else{
        const assignment  = await assignmentModel.find({});
        if(!Notes) return next(error(404,"Assignment not found!")).sort({date:-1})
         res.status(200).json(assignment) 
        }
    } catch (err) {
         next(err)
    }
}

export const deleteAssignment = async(req,res,next)=>{
     const assignmentId = req.body.id;
    try {
      const assignment = await assignmentModel.findByIdAndDelete(assignmentId);
       if(!assignment) return next(error(404,"Assignment not found"))
     res.status(200).json({massage:"Assignment delete sucessfully"})
        
    } catch (err) {
         next(err)
    }
}


