import React, { useEffect, useState } from 'react'
import loginImg from "../../../assets/login url.png"
import loginStyle from "../../css/login/Login.module.css"
import logo from "../../../assets/logo.png"
import { redirect, useNavigate } from 'react-router-dom'
import { ClickStyle, StudentClickStyle, StudentnoneClickBtn, noneClickBtn } from '../OptionBtn'
import Navber from "../navber/Navber"
import axios from 'axios'
import { Alert, Button, Modal, Select, notification } from 'antd';
import { studentLoginStart, studentLoginSucess } from '../../../redux/studentSlice'

import { useDispatch, useSelector } from 'react-redux'
import { instructorLoginStart, instructorLoginSucess } from '../../../redux/instructorSlice'

export  const Signin = () => {
    const dispatch = useDispatch()
    const { currentStudent } = useSelector((state) => state.student)
    const { currentInstructor } = useSelector((state) => state.instrutor)
    const [loading, setLoading] = useState(false)
    
    const [loginData, setLoginData] = useState({})
    const [loginType, setLoginType] = useState("")
    const [token, setToken] = useState("")
    const Nevigate = useNavigate();
    const [messageApi, inputErrorMassage] = notification.useNotification();

    const loginInputHandler = (e) => {
        setLoginData({
            ...loginData, [e.target.name]: e.target.value
        })
    }

   


    const LoginHandler = () => {
        if (loginType === null || loginType === '') {
            messageApi.error({
                message: `Select Login Type`,
                description: 'Please  Choose Your Login Type',
                placement: 'top',

            })
            return false;
        }


        if (loginData.email === "" || loginData.email === null) {
            messageApi.error({
                message: `Email is required`,
                description: 'Please Enter Your Email',
                placement: 'top',

            })
            return false;
        }



        if (loginData.password === "" || loginData.password === null) {
            messageApi.error({
                message: `Password is required`,
                description: 'Please Enter Your Password',
                placement: 'top',

            })
            return false;
        }


        if (loginType === "Student") {
            setLoading(true)
            dispatch(studentLoginStart())
            axios.post("https://dearmschool.com/api/student/login", { ...loginData }, {}).then((res) => {

                localStorage.setItem("studentdsts", res.data.token)
                messageApi.success({
                    message: `Loging Success`,
                    description: `${res.data?.massage}`,
                    placement: 'top',

                })
                dispatch(studentLoginSucess(res.data.data))
            
                setLoading(false)
                setTimeout(() => {
                    window.location.reload();
                              
              }, 1000);

            }).catch((err) => {
                console.log(err)
                messageApi.error({
                    message: `Something wrong`,
                    description: `${err.response?.data?.massage || "Internal Server Eroor"}  `,
                    placement: 'top',

                })
                setLoading(false)

                return false;

            })
    // if (currentStudent.batchStatus ==='true' && currentStudent.batch !== null) {
    //     Nevigate('/student')
    // }
        }

        if (loginType === "Instructor") {
            setLoading(true)

            dispatch(instructorLoginStart())
            axios.post("https://dearmschool.com/api/instractor/login", { ...loginData }, {}).then((res) => {

                localStorage.setItem("instractordsts", res.data.token)
                messageApi.success({
                    message: `Loging Success`,
                    description: `${res.data?.massage}`,
                    placement: 'top',

                })
                dispatch(instructorLoginSucess(res.data.data))
                setLoading(false)
               
                setTimeout(() => {
                    window.location.reload();
                              
              }, 1000);
                  


            }).catch((err) => {
                messageApi.error({
                    message: `Something wrong`,
                    description: `${err.response?.data?.massage || "Internal Server Eroor"}  `,
                    placement: 'top',

                })
                setLoading(false)

                return false;

            })
 
        }


        if (loginType === "Mentor") {
            Nevigate("/Mentor")
        }

        if (loginType === "Staff") {
            Nevigate("/Staff")
        }
        setLoginData({
            email: "",
            password: ""

        })
   
    }
  
    useEffect(()=>{

        const token =localStorage.getItem('studentdsts')
        const  student =localStorage.getItem('instractordsts')
       if(token){
          axios.get(`http://localhost:8080/api/student?id=${currentStudent?._id}`).then((item)=>{
            if(item.data[0].batchStatus==='true' && item.data[0].batch!==null ){
              Nevigate('/student')
            } 
          
          }).catch((err)=>{
             console.log(err?.response?.data?.massage || "something error")
          })
           
          } 
      
    else if(student){
      axios.get(`http://localhost:8080/api/instractor?id=${currentInstructor?._id}`).then((item)=>{
    
      
      if(item.data[0].subscription==='true'){
          Nevigate('/Instractor')
         }  
      }).catch((err)=>{
        console.log(err)
      })
    
    
    } else{
        console.log('eeer')
    }
    
   
    },[LoginHandler])
   

    return (
        <>
            <Navber />
            <div className={loginStyle.contanar}>
                {inputErrorMassage}
                <div className={loginStyle.section1}>

                    <div className={loginStyle.login}>
                        <img src={loginImg} alt="error" />
                    </div>
                    <div className={loginStyle.text}>
                        <h2>Welcome to Dreams School.</h2>
                        <p>India's Best E-learning Pletform of Student </p>
                    </div>
                </div>
                <div className={loginStyle.section2}>

                    <div className={loginStyle.form}>

                        <div className={loginStyle.logoback}>

                            <div className={loginStyle.logo}>
                                <img src={logo} alt="err" />
                            </div>

                            <p onClick={() => Nevigate("/")}>Back to Home</p>
                        </div>
                    </div>
                    <div className={loginStyle.Signupform}>
                        <div className={loginStyle.Heading}>
                            <span style={{fontSize:'18px'}}>Login to your account</span>
                        </div>
                        <div className={loginStyle.signupOption}>
                            <select className={loginStyle.Intractor}
                                style={(loginType === "Instructor" || loginType === "Mentor" ||
                                    loginType === "Staff") ? ClickStyle : noneClickBtn} onChange={(e) => setLoginType(e.target.value)} >
                                <option >Select type </option>
                                <option value="Instructor">Instructor</option>
                                <option value="Mentor">Mentor</option>
                                <option value="Staff">Staff</option>
                            </select>
                            <button className={loginStyle.student} style={(loginType === "Student") ? StudentClickStyle : StudentnoneClickBtn} onClick={() => setLoginType("Student")}> Student</button>
                        </div>
                        <div className={loginStyle.signupNow}>

                            <div className={loginStyle.forms}>



                                <div className={loginStyle.email}>
                                    <label htmlFor="email">Email<sup>*</sup></label>
                                    <input type="text" name='email' placeholder='Enter email'
                                        value={loginData.email}
                                        onChange={loginInputHandler}
                                    />
                                </div>
                                <br />

                                <div className={loginStyle.password}>
                                    <label htmlFor="password">Password<sup>*</sup> </label>
                                    <input type="password" name="password" placeholder='Enter password'
                                        value={loginData.password}
                                        onChange={loginInputHandler}

                                    />
                                </div>


                                <div className={loginStyle.signupBtn}>
                                    <button type='submit' onClick={LoginHandler}>{(loading)?"loading...":"Login"}</button>
                                </div>
                                <p style={{
                                    textAlign: "right",
                                    fontSize: "14px", padding: "5px 10px", color: "blue"
                                    , cursor: "pointer", fontFamily: " 'Roboto', sans-serif"
                                }}>
                                  <ForgotPassword/>

                                </p>
                            </div>
                            <div className={loginStyle.alerdy}>
                                <p>New User ?<span onClick={() => Nevigate("/signup")}> Register now</span></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

const ForgotPassword = ()=> {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verifyEmail,setVerifyEmail] = useState(false);
  const [updateType,setUpdateType] =useState("")
  const [email,setEmail] =useState("")
  const [verifyid,setVerifyId]=useState(null)
  const [password,setPassword] =useState("")
  const [confirmPassword,setConfirmPassword] =useState("")
  const [massage,massageContext] =notification.useNotification()

    const showModal = () => {
         setIsModalOpen(true);
       };
 
       const handleOk = () => {

        if(updateType===null || updateType===""){
            massage.error({
                message:"Updated field error",
                description:"Please choose updated type",
                placement:"top"
            })
        return false;
        }
        // ======================================================
        if(email==="" || email===null){
            massage.error({
                message:" Email field error ",
                description:"Please enter registered email",
                placement:"top"
            })
        return false;
        }

    


    if(updateType==='student'){
        if(!verifyid){
            axios.put("http://localhost:8080/api/forgotPassword",{email}).then((res)=>{ 
                
                massage.success({
                   message:"Email verification success ",
                   description:res.data.massage ,
                placement:"top"
            })
            
            console.log("gg",res.data);
            setVerifyEmail(true)
            setVerifyId(res.data.id)
       
        }).catch((err)=>{
                massage.error({
                    message:"Email verification error ",
                    description:err.response.data.massage ||"Internal Server Error",
                    placement:"top"
                })
     return false
            })
        }
 else{
            // =================================================================================================
        if(password===""){
            massage.error({
                message:" Password field error ",
                description:"Please enter new password",
                placement:"top"
            })
        return false;
        }

        // ========================================================

        if(password<8){
            massage.error({
                message:"Password field error ",
                description:"Please enter 8 digit minimum password",
                placement:"top"
            })
        return false;
        }
        // =========================================================
        if(confirmPassword===""){
            massage.error({
                message:" Confirm password field error ",
                description:"Enter confirm password",
                placement:"top"
            })
        return false;
        }
    // ===============================================================

    if(confirmPassword===""){
        massage.error({
            message:" Confirm password field error ",
            description:"Enter confirm password",
            placement:"top"
        })
    return false;
    }

    // =======================================================================

    if(confirmPassword!==password){
        massage.error({
            message:" Confirm password field error ",
            description:"Enter confirm password does't match",
            placement:"top"
        })
    return false;
    }
       axios.put("http://localhost:8080/api/forgotPassword",{verifyId:verifyid,password:password})
                .then((res)=>{ 
                    
                    massage.success({
                       message:"Password Reset Success ",
                       description:res.data.massage ,
                    placement:"top"
                })
              
            }).catch((err)=>{
                    massage.error({
                        message:"Password Reset Error ",
                        description:err.response.data.massage ||"Internal Server Error",
                        placement:"top"
                    })
        
                })
           setPassword("");
           setEmail("");

           setConfirmPassword("")
           setVerifyId("")
           setVerifyEmail(false)
         setUpdateType("")

        }


    } 

    if(updateType==='instructor'){
   
    if(!verifyid){
        axios.put("http://localhost:8080/api/instractor/forget",{resetEmail:email})
        .then((res)=>{
            massage.success({
                message:"Email verification success ",
                description:res.data.massage ,
                placement:"top"
         })
         
         console.log("gg",res.data);
         setVerifyEmail(true)
         setVerifyId(res.data.id)
    
     }).catch((err)=>{
             massage.error({
                 message:"Email verification error ",
                 description:err.response.data.massage ||"Internal Server Error",
                 placement:"top"
             })
          return false
         })
    
    }
    
else{

        if(password===""){
            massage.error({
                message:" Password field error ",
                description:"Please enter new password",
                placement:"top"
            })
        return false;
        }

        // ========================================================

        if(password<8){
            massage.error({
                message:"Password field error ",
                description:"Please enter 8 digit minimum password",
                placement:"top"
            })
        return false;
        }
        // =========================================================
        if(confirmPassword===""){
            massage.error({
                message:" Confirm password field error ",
                description:"Enter confirm password",
                placement:"top"
            })
        return false;
        }
    // ===============================================================

    if(confirmPassword===""){
        massage.error({
            message:" Confirm password field error ",
            description:"Enter confirm password",
            placement:"top"
        })
    return false;
   
}

    // =======================================================================

    if(confirmPassword!==password){
        massage.error({
            message:" Confirm password field error ",
            description:"Enter confirm password does't match",
            placement:"top"
        })
    return false;
    }
    axios.put("http://localhost:8080/api/instractor/forget",{passwordId:verifyid,resetpassword:password})
                .then((res)=>{ 
                    
                    massage.success({
                       message:"Password Reset Success ",
                       description:res.data.massage ,
                    placement:"top"
                })
              
            }).catch((err)=>{
                    massage.error({
                        message:"Password Reset Error ",
                        description:err.response.data.massage ||"Internal Server Error",
                        placement:"top"
                    })
        
                })
            setPassword("");
            setEmail("");

          setConfirmPassword("")
         setVerifyId("")
         setUpdateType("")
         setVerifyEmail(false)
         }
     

    }

   
}


 
 const handleCancel = () => {
         setIsModalOpen(false);
       };
       
const handleChange = (e) => {
    setUpdateType(e.target.value)

  };
 
     return (
         <>
         {massageContext}
         <p onClick={showModal} >Forgot Password ?</p>
         <Modal title="Forgot now"  open={isModalOpen} 
         onOk={handleOk} onCancel={handleCancel} okText={(email)?"forgot now":"verify"}> 
        <div style={{display:"flex",justifyContent:"space-between",width:"100%",padding:"10px  20px 4px 20px"}} >
        <select
      style={{backgroundColor:(updateType==="instructor" || updateType==="mentor" ||updateType==="stuff")?"#FF6575":"white",padding:"5px" ,
      border:"1px solid gray",outline:"none" ,borderRadius:"5px",
      color:(updateType==="instructor" || updateType==="mentor" ||updateType==="stuff")?"white":"#FF6575",
            fontWeight:"600",
    }}
      
      onChange={handleChange}
    
    >
        <option value="">Choose Type</option>
        <option value="instructor">Instructor</option>
        <option value="mentor">Mentor</option>
        <option value="stuff">Stuff</option>
        

   </select>
            <button style={{backgroundColor:(updateType==="student")?"#FF6575":"white",
            color:(updateType==="student")?"white":"#FF6575",
            fontWeight:"600",
            padding:"8px" ,
            border:"1px solid gray",outline:"none" ,borderRadius:"5px",
         
        }} onClick={(e)=>setUpdateType("student")} >Student</button>
        </div>

        <div style={{width:"100%",padding:"5px 30px 20px 30px" ,color:"#fff",margin:'5px 0px'}}>
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
         
            <label htmlFor="" >Email<sup>*</sup></label>
            {
            (verifyEmail===true && verifyid!==null)?
            <Alert message="Success Tips" type="success" showIcon />:

            <input type="text"  placeholder='Enter registered email' 
            style={{padding:"7px" ,border:"0.4px solid lightgray",outline:"none",borderRadius:"5px" ,marginBottom:'4px'}}
            value={email} onChange={(e)=>setEmail(e.target.value)} />
            }
              
            </div>
{
    (verifyid && verifyEmail) &&
      <div  style={{padding:"5px 0px 20px 0px"}}>
           
       <div style={{display:"flex",flexDirection:"column",width:"100%"}}>  
        <label htmlFor="">New Password<sup>*</sup></label>
             
              <input type="password"
              style={{padding:"7px" ,border:"0.4px solid lightgray",outline:"none",borderRadius:"5px" ,marginBottom:'4px'}}
              
              placeholder='Enter new password' value={password} onChange={(e)=>setPassword(e.target.value)}   />
        </div>

       <div style={{display:"flex",flexDirection:"column",width:"100%"}}>

         <label htmlFor="" >Confirm Password<sup>*</sup></label>
              <input type="text" 
              style={{padding:"7px" ,border:"0.4px solid lightgray",outline:"none",borderRadius:"5px" ,marginBottom:'4px'}}
              
              placeholder='Enter confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  />
         </div>
      </div>
            }   
        </div>
   
         </Modal>
         </>
     )
 }