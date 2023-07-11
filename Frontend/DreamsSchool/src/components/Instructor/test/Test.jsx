import React, { useEffect, useState } from 'react'
import testStyle from "./Test.module.css"
import { Button, Card, Input, Select } from 'antd'
import liveLogo from '../../../assets/class.jpg'
 import axios from "axios"
import { useSelector } from 'react-redux'
import { notification } from 'antd';
 
const Test = () => {
  const { currentInstructor } = useSelector((state) => state.instrutor)
  const [testLink,setTestLink] =useState({
    chapter: "",
    subject: "",
    date: "",
    batch: "",
    link:""
  })

  console.log(testLink);
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

  const testLinkInputHandler =(e)=>{
      setTestLink({
      ...testLink,[e.target.name]:e.target.value

    })
  }

  

const addTestLinkHandler =()=>{
  setLoading(true)
  axios.post('https://dreamsachool-y2s8.onrender.com/api/addTest',{...testLink})
  .then((res) => {
      messageApi.success({
        message: `Test link upload Success`,
        description: `${res.data?.massage}`,
        placement: 'top',

      })
      setLoading(false)
    }).catch((err) => {
      messageApi.error({
        message: `Test links upload filed `,
        description: `${err.response?.data?.massage || "Internal server  error"}`,
        placement: 'top',

      });
      setLoading(false)
      return false
    })
setTestLink({
      chapter: "",
      subject: "",
      date: "",
      batch: "",
      link:""

    })

  }

 return (
 
 
<div className={testStyle.mainContainer} >
{inputErrorMassage}

     <div className={testStyle.imgs}>
       <img src={liveLogo} alt="" height='100%' width='95%' />
     </div>
    <div className={testStyle.form}>
      <div className={testStyle.formHeading}>
       <p>Upload online test link</p>
      </div>
    <div className={testStyle.linkinput}>
          <input type="text" style={{ width: "100%" }} name='chapter' value={testLink.chapter} placeholder='Enter chapter name' onChange={testLinkInputHandler} />
          <input type="text" style={{ width: "100%" }} name='subject' value={testLink.subject}  placeholder='Enter subject name' onChange={testLinkInputHandler}  />
    </div>
    <div className={testStyle.linkDiv}>
     
          <input type="datetime-local" placeholder='12:00am'  name='date' value={testLink.date} onChange={testLinkInputHandler}  />

          {/* === */}
          <select name="batch" value={testLink.batch} onChange={testLinkInputHandler} >
          <option >{"batch"}</option>
          {
            batch.map((batch)=>(
              <option value={batch}>{batch}</option>
            ))
          }
           
           
          </select>
        </div>

        <div className={testStyle.linkinput}>
          <input type="text" style={{ width: "100%" }} name='link' value={testLink.link} placeholder='Enter Test Link' onChange={testLinkInputHandler}  />
      </div>
      <div style={{width:"100%",padding:"0px 10px"}}>
       <button className={testStyle.button} onClick={addTestLinkHandler} >{(loading)?"loading...":"Upload test link"}</button>
    </div>
      </div>
    </div >

  )
}

export default Test
  