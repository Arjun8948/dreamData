
import error from "../error.js";
import instructorModel from "../model/Instractor/lntractorModel.js"
import bcrypt from "bcrypt"
import sendInstrutorGmail from "../model/mail/instractorRegistetion.js";
import jwt from "jsonwebtoken";


export const instructorSignup = async (req, res, next) => {
    console.log(req.body);
    const url = req.protocol + '://' + req.get('host')
    // console.log(req.body)
    try {
        const checkUser = await instructorModel.findOne({email:req.body.email});
   
        if (checkUser) {
            return next(error(409, "Your Email Already Ragisterted"));
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        
        const newInstructor = await instructorModel.create({
            ...req.body,
            password: hashPassword,
            profileImg:url + '/upload/' + req.file.filename,
    
        })
        res.status(200).json({newInstructor, massage: "Ragistration successfully done"});
        
        sendInstrutorGmail( req.body.name, req.body.email, req.body.password);


    } catch (err) {
        next(err)
    }

}
export const instructorLogin = async (req, res, next) => {
    console.log(req.body);
    try {
        const checkUser = await instructorModel.findOne({email:req.body.email});
        if(!checkUser) return next(error(404,'Instructor not found'));
        const checkPassword = await bcrypt.compare(req.body.password,checkUser.password)
        if(!checkPassword)return next(error(401,"email or password invalid"))
        const token = jwt.sign({id:checkUser._id},process.env.ScrateKey);
        const {password:password,...data} =checkUser._doc
        res.status(200).json({token, data:data,massage:"loging sucessfully "})
        
    } catch (err) {
        next(err)
    }
   

}
export const instructorupdate = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
   const id = req.body.id;
//    console.log(req.body);
   const{ profileImg,...updatedData}  =req.body
   console.log(updatedData);
   
try {
    if(req.file){
        const updateDate = await instructorModel.findByIdAndUpdate(id,{$set:{
            ...req.body,
            profileImg:url + '/upload/' + req.file.filename,
         }},{new:true})
        res.status(200).json({updateDate,massage:"Instrutor deteils updated sucessfully"})
    }else{
        const updateDate = await instructorModel.findByIdAndUpdate(id,{$set:{
            ...updatedData
         }},{new:true})
        res.status(200).json({updateDate,massage:"Instrutor deteils updated sucessfully"})  
    }

} catch (err) {
    next(err)
}

}



export const instructordelete = async (req, res, next) => {
    const id = req.query.id;
    console.log(id);
    try {
        const removeInstractor = await instructorModel.findByIdAndDelete(id);
        if(!removeInstractor) return next(error(404,"not found data"))
        res.status(200).json({massage:"Instructor sucessfully delete"})
    } catch (err) {
        next(err)
    }
}


export const instructorget = async(req,res,next)=>{
    const id = req.query.id;
   
   try {
      if(id){
         const instructor = await instructorModel.find({_id:id})
         if(!instructor) return next(error(404,'data not found'))
         res.status(200).json(instructor)
      }
  
      else{
         const instructor = await instructorModel.find({})
         if(!instructor) return next(error(404,'data not found'))
         res.status(200).json(instructor)
      }
       
   } catch (err) {
      next(err)
   }
}


export const instructorForgetPassword = async(req,res,next)=>{
      const password =req.body.resetpassword
      const id = req.body.passwordId
      console.log(req.body);
   try {
  if(!password){
        const findEmail = await instructorModel.findOne({email:req.body.resetEmail})
        if(!findEmail) return next(error(404,"Your account does't exits"))
        res.status(200).json({id:findEmail._id,massage:"Email verification success"})
   
    }else{
        const hashPassword = await bcrypt.hash(password,10)
        const resetPassword = await instructorModel.findByIdAndUpdate(id,{$set:{
         password:hashPassword
        }},{new:true})
        if(!resetPassword)return next(error,(404,"instructor deteils not found "))
         
        res.status(200).json({resetPassword,massage:"Password reset sucessfully"})
       
    }
      
   } catch (err) {
      next(err)
   }
}


export const  incrementPresent = async(req,res,next)=>{
  const id = req.query.id
    try {
        const totalPresent = await instructorModel.findByIdAndUpdate(id,{$inc:{present:1}},{new:true});
        if(!totalPresent) return next(error(404,"Instructor attendense field"));
        res.status(200).json({totalPresent,massage:"Instructor attendense add successfully"});
    } catch (err) {
         next(err)
    }
}


export const  decrementPresent = async(req,res,next)=>{
    const id = req.query.id
      try {
          const totalPresent = await instructorModel.findByIdAndUpdate(id,{$inc:{absent:1}},{new:true});
          if(!totalPresent) return next(error(404,"Instructor attendense field"));
          res.status(200).json({totalPresent,massage:"Instructor attendense add successfully"});
      } catch (err) {
           next(err)
      }
  }
  



















