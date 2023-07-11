import mongoose from "mongoose";
import error from "../../error.js";
import notesModel from "../../model/notes/notesModel.js"

export const addNotes = async(req,res,next)=>{
   console.log(req.body,req.file);
   const {chapterName,subChapter,batch,subject,date} = req.body;
   if(!chapterName || !subChapter || !batch ||!subject ||!req.file ||!date){
    return next(error(400,"All filed is required!"))
   }
   const url = req.protocol + '://' + req.get('host')

  try {
    const newNotes = await notesModel.create({
        ...req.body,
        notesUrl:url + '/upload/' + req.file.filename,
    
    })
     res.status(200).json({newNotes,massage:"Notes upload sucessfully"})
    } catch (err) {
         next(err)
    }
}

export const getNotes = async(req,res,next)=>{
   const batch =  req.query.batch;
   const subject =  req.query.subject;
   
   try {
      if(batch && subject){
        const Notes  = await notesModel.find({$and:[{batch:batch},{subject:subject}]}).sort({date:-1});
        if(!Notes) return next(error(404,"Notes not found!"))
         res.status(200).json(Notes)
        }else{
        const Notes  = await notesModel.find({});
        if(!Notes) return next(error(404,"Notes not found!")).sort({date:-1})
         res.status(200).json(Notes) 
        }
    } catch (err) {
         next(err)
    }
}

export const deleteNotes = async(req,res,next)=>{
     const NotesId = req.body.id;
    try {
      const Notes = await notesModel.findByIdAndDelete(NotesId);
       if(!Notes) return next(error(404,"Notes not found"))
     res.status(200).json({massage:"Notes delete sucessfully"})
        
    } catch (err) {
         next(err)
    }
}

















