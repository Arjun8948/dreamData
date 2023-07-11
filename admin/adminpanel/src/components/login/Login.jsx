import React,{useEffect, useState} from 'react'
import loginStyle from "./Login.module.css"
import {Button} from "antd"
import adminLogin from  "../../assets/download.png"
import Forgot from '../forgot/Forgot'
import {notification } from 'antd';
 import axios from "axios"
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../../redux/adminSlice'
 
const Login = ({setLogin}) => {
  const dispatch = useDispatch()
  const [loading,setLoading]=useState(false)
  const [loginInput,setLoginInput]= useState({
    email:"",
    password:""
  });
  const [message, contextHolder] = notification.useNotification();
 
 const loginInputHandlar =(e)=>{
  setLoginInput({...loginInput,[e.target.name]:e.target.value})
 }

const adminLoginHandler = (e)=>{
   e.preventDefault();
   if(loginInput.email===null || loginInput.email===""){
    message.error({
      message: ` Registered Email Required`,
      description:`Enter Your Registered Email `,
      placement:'top',
    });
    return false
   }
   else if(loginInput.password===null || loginInput.password===""){
    message.error({
      message: ` Registered Password Required`,
      description:`Enter Your Registered Password `,
      placement:'top',
    });
    return false
   }
   else{
    dispatch(loginStart())
    setLoading(true)
    axios.post(`https://dearmschool.com/api/admin/login`,{...loginInput}).then((res)=>{
      dispatch(loginSuccess(res.data.admin))
      sessionStorage.setItem("admintoken",res.data.token)
      setLoading(false)
     message.success({
        message: `Admin Loging  Success `,
        description:`${res.data.massage}`,
        placement:'top',
      });
      
    }).catch((err)=>{
      dispatch(loginFailure())
        message.error({
            message: `Admin Loging Field`,
            description:`${err.response?.data?.massage || "Internal Server Error"}`,
            placement:'top',
          });
       setLoading(false)
          return false
    })
  
   }
   setTimeout(()=>{
      
      const token = sessionStorage.getItem("admintoken")
    if(token){
      setLogin(true)
    }else{
      setLogin(false)
    }
  
  },1000)
}

 

 
return (
    <div className={loginStyle.loginConteinar} >
      {contextHolder}
      <div className={loginStyle.loginsubConteinar}>
        < p className={loginStyle.loginHeading}>Dreams School Admin Panel </p>
        <div className={loginStyle.logoIcon} >
          <img src={adminLogin} alt="" />

        </div>
        <form >
          <div>
            <label htmlFor="">Email<sup>*</sup></label>
            <input type="email" placeholder='Enter  Email' 
            name='email'
            value={loginInput.email} required onChange={loginInputHandlar}/>
          </div>

          <div>
            <label htmlFor="">Password<sup>*</sup></label>
            <input type="password"  required placeholder='Enter Password' 
             name='password'
             value={loginInput.password}  onChange={loginInputHandlar}
            />
          </div>

          <div className={loginStyle.LoginBtn}>
            <Button type='primary' size='large'  onClick={adminLoginHandler}>{(loading)?"Loading...":"Login"} </Button>
          </div>


          <div className={loginStyle.forgetPassword}>
            <span> </span>
            <Forgot>Forgot Password ?</Forgot>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login