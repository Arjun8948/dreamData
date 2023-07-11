import mongoose from "mongoose";
import adminModel from "../../model/admin/adminModel.js";
import error from "../../error.js";
import jwt  from "jsonwebtoken"
import bcrypt from "bcrypt"
import sendAdminGmail from "../../model/mail/adminRagistetion.js";

export const adminSignup =async(req,res,next)=>{
    console.log(req.body,req.file)
    const url = req.protocol + '://' + req.get('host')
   try {
        const {name,email,password,phone} = req.body;

        if(!name || !email ||!password || !req.file ||!phone){
         return next(error(400,"All fields required"))
        }
        const checkAdmin = await adminModel.findOne({email});
        if (checkAdmin) return next(error(403,"Admin account already exits"))
        const hashPassword = await bcrypt.hash(password,10)
     const  admin = await adminModel.create({
         ...req.body,
         password:hashPassword,
         profileImg:url + '/upload/' + req.file.filename,
     })
      res.status(200).json({admin,massage:"Admin account sucessfully created"})
      sendAdminGmail(name,email,password)
    } catch (err) {
         next(error)
    }

   
}

export const adminLogin =async(req,res,next)=>{
    console.log(req.body);
    try {
        const {email,password} = req.body;
        if(!email || !password) return next(error(400,"All fields required"));
       const  checkAdmin  = await adminModel.findOne({email});
       if(!checkAdmin) return next(error(404,"Admin account does't exits"))
       const checkPassword = await bcrypt.compare(password,checkAdmin.password)
       if(!checkPassword) return next(error(400,"email or password invalid"))
       
        const adminToken = jwt.sign({id:checkAdmin._id},process.env.ScrateKey)
        {
          const { password,__v,token,...other} = checkAdmin._doc
          res.status(200).json({token:adminToken,admin:other,massage:"Admin loging Sucessfull"})
        }
       
    
    } catch (err) {
        next(err)
    }
   
}


export const adminGet =async(req,res,next)=>{
    try {
        if(req.body.email){
            const admin = await adminModel.findOne({email:req.body.email})
           if(!admin) return next(error(404,"admin not found!"))
           res.status(200).json({admin})
          }else{
            const admin = await adminModel.find({})
            if(!admin) return next(error(404,"admin not found!"))
            res.status(200).json({admin})
          }

    } catch (err) {
         next(err)
    }
 
}


export const adminUpdate =async(req,res,next)=>{
    const url = req.protocol + '://' + req.get('host')
    const id = req.body.id;
    const file = req.file
   try {
    if(file){
        
        const adminUpdate = await adminModel.findByIdAndUpdate(id,{$set:{
            ...req.body,
            profileImg:url + '/upload/' + req.file.filename,

           }},{new:true})
            res.status(200).json({admin:adminUpdate,massage:"Admin updated sucessfully"})
    }else{
        const adminUpdate = await adminModel.findByIdAndUpdate(id,{$set:{
            ...req.body
           }},{new:true})
     res.status(200).json({admin:adminUpdate,massage:"Admin updated sucessfully"})
    }

   } catch (err) {
      next(err)
   }

}


export const adminDelete =async(req,res,next)=>{
    const id = req.query.id;
    try {
     const adminDelete = await adminModel.findByIdAndDelete(id);
     if(!adminDelete) return next(error(404,"admin not found"))
     res.status(200).json({massage:"Admin remove sucessfully"})
    } catch (err) {
       next(err)
    }
 

}


export const adminForgot =async(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const id = req.body.id;
    console.log(email,password,id)
    try {
        if(email){
            const verify = await adminModel.findOne({email});
            if(!verify) return next(error(404,"Admin not authorized"))
            res.status(200).json({admin:verify,massage:"Admin Verification Sucessfull "})
        }
     else{
           
            const hashPassword =await bcrypt.hash(password,10)
            console.log(hashPassword);
            const verifyData = await adminModel.findByIdAndUpdate(id,{$set:{
               password:hashPassword
            }},{new:true});
            res.status(200).json({admin:verifyData,massage:"Password Sucessfull Reset"})
        
        }
      } catch (err) {
       next(err)
    }
 

}











