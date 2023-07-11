import mongoose from "mongoose";
import error from "../../error.js";
import bookModel from "../../model/books/bookModel.js";


export const addBook = async(req,res,next)=>{
    console.log(req.body);
    const {className,subjectName} = req.body;
   if(!className || !subjectName ||!req.file) return next(error(400,"All filed required"))
   const url = req.protocol + '://' + req.get('host')
 
   try {
      const books = await bookModel.create({
        className,
        subjectName,
        books:url + '/upload/' + req.file.filename
      })   
      res.status(200).json({books,massage:"Books upload sucessfully"})
   
    } catch (err) {
        next(err)
    }
}

export const updateBook = async(req,res,next)=>{
    const {id ,...other}= req.body;
    const url = req.protocol + '://' + req.get('host')
    try {
        if(req.file){
           const books = await bookModel.findByIdAndUpdate(id,{$set:{
            ...other,
             books:url + '/upload/' + req.file.filename
           }},{new:true})
           res.status(200).json({books,massage:"Books update sucessfully"})

        }else{
            const books = await bookModel.findByIdAndUpdate(id,{$set:{
                ...other,
                }},{new:true})
               res.status(200).json({books,massage:"Books update sucessfully"})
        }
    } catch (err) {
        next(err)
    }

}

export const getBook = async(req,res,next)=>{
      const {className}  = req.body;
    try {
           if(className){
              const books = await bookModel.find({className}).sort({className:1}).collation({locale: "en_US", numericOrdering: true});
              if(!bookModel) return next(error(404,"data not found"))
              res.status(200).json(books)
           }else{
            const books = await bookModel.find({}).sort({className:1}).collation({locale: "en_US", numericOrdering: true});
            if(!bookModel) return next(error(404,"data not found"))
            res.status(200).json(books)
           }
    } catch (err) {
        next(err)
    }

}


export const deleteBook = async(req,res,next)=>{
    const id = req.query.id;
try {
    const books = await bookModel.findByIdAndDelete(id);
    if(!books) return next(error(404,"Books not found"))
  res.status(200).json({massage:"books delete sucessfully"})
     
    } catch (err) {
        next(err)
    }

}



