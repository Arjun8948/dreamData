import mongoose from "mongoose";
import error from "../../error.js";
import testModel from "../../model/test/testModel.js"


export const addTest = async (req,res,next)=>{
    console.log(req.body);
    const {batch,subject,chapter,link,date} = req.body;

    if(!batch || !subject || !chapter || !link ||!date){
        return next(error(400,"All field Required"))
    }
    try {
        const newTest= await testModel.create({
            ...req.body
        })
        res.status(200).json({newTest,massage:"Test upload sucessfully"})
    
    } catch (err) {
        next(err) 
    }
}


export const getTest = async (req,res,next)=>{
      const batch = req.query.batch;
    try {
        if(batch){
            const testData = await testModel.find({batch}).sort({createdAt:-1})
            if(!testData) return next(error(404,"Test not found"))
            res.status(200).json(testData)
        }
       else{
        const testData = await testModel.find({}).sort({createdAt:-1})
        if(!testData) return next(error(404,"Test not found"))
        res.status(200).json(testData)
       }
        
    } catch (err) {
        next(err) 
    }
}



export const updateTest = async (req,res,next)=>{
    const {id,...other} =req.body;
    try {
         const updateTest = await testModel.findByIdAndUpdate(id,{$set:{...other}},{new:true});
         res.status(200).json({massage:"Test updated sucessfully"})
     } catch (err) {
        next(err) 
    }
}



export const deleteTest = async (req,res,next)=>{
    const id = req.body.id;
    try {
      const deleteTest = await testModelModel.findByIdAndDelete(id);
       if(!deleteTest) return next(error(404,"Test not found"))
     res.status(200).json({massage:"Test delete sucessfully"})
    } catch (err) {
        next(err) 
    }
}