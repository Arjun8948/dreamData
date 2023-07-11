import React, { useEffect, useState } from 'react'
import classStyle from "./Class.module.css"
import { Button, Card, Input, Select } from 'antd'
import liveLogo from '../../../assets/class.jpg'
 import axios from "axios"
import { useSelector } from 'react-redux'
import { notification } from 'antd';
 
const AddClass = () => {
  const { currentInstructor } = useSelector((state) => state.instrutor)
  const [classLink,setClassLink] =useState({})
  const [batch,setBatch] =useState([]);
  const [messageApi, inputErrorMassage] = notification.useNotification();
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    axios.get(`https://dreamsachool-y2s8.onrender.com/api/student/bacth`).then((res)=>{
      setBatch(res.data)
    }).catch((err)=>{
  console.log(err);
    })
  },[])

  const classLinkInputHandler =(e)=>{
    setClassLink({
      ...classLink,[e.target.name]:e.target.value

    })
  }

  

const addClassLinkHandler =()=>{
  setLoading(true)
  axios.post('https://dreamsachool-y2s8.onrender.com/api/classlink/add',
  {...classLink,subject:currentInstructor.subject,instructorId:currentInstructor._id})
  .then((res) => {
      messageApi.success({
        message: `Class link upload Success`,
        description: `${res.data?.massage}`,
        placement: 'top',

      })
      setLoading(false)
    }).catch((err) => {
      messageApi.error({
        message: `Class links upload filed `,
        description: `${err.response?.data?.massage || "Internal server  error"}`,
        placement: 'top',

      });
      setLoading(false)
      return false
    })
    setClassLink({
      chapterName: "",
      subChapter: "",
      date: "",
      batch: "",
      classLink:""

    })

  }

 return (
 
 
<div className={classStyle.mainContainer} >
{inputErrorMassage}

     <div className={classStyle.imgs}>
       <img src={liveLogo} alt="" height='100%' width='95%' />
     </div>
    <div className={classStyle.form}>
      <div className={classStyle.formHeading}>
       <p>Upload today class link</p>
      </div>
    <div className={classStyle.linkinput}>
          <input type="text" style={{ width: "100%" }} name='chapterName' value={classLink.chapterName} placeholder='Enter Chapter Title' onChange={classLinkInputHandler} />
          <input type="text" style={{ width: "100%" }} name='subChapter' value={classLink.subChapter}  placeholder='Enter Chapter Subtitle' onChange={classLinkInputHandler}  />
    </div>
    <div className={classStyle.linkDiv}>
     
          <input type="datetime-local" placeholder='12:00am'  name='date' value={classLink.date} onChange={classLinkInputHandler}  />

          {/* === */}
          <select name="batch" value={classLink.batch} onChange={classLinkInputHandler} >
          <option >{"batch"}</option>
          {
            batch.map((batch)=>(
              <option value={batch}>{batch}</option>
            ))
          }
           
           
          </select>
        </div>

        <div className={classStyle.linkinput}>
          <input type="text" style={{ width: "100%" }} name='classLink' value={classLink.classLink} placeholder='Enter Class Link' onChange={classLinkInputHandler}  />
      </div>
      <div style={{width:"100%",padding:"0px 10px"}}>
       <button className={classStyle.button} onClick={addClassLinkHandler} >{(loading)?"loading...":"Upload class link"}</button>
    </div>
      </div>
    </div >

  )
}

export default AddClass
