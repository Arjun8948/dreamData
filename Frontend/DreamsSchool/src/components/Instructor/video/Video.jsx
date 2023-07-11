import React, { useEffect, useState } from 'react'

import vedioStyle from "./Vedio.module.css"

import { Button, Card, Input, Select } from 'antd'
import { Progress } from 'antd';
import liveLogo from '../../../assets/class.jpg'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { notification } from 'antd';
const Video = () => {
  const [batch, setBatch] = useState([]);
  const [loading,setLoading] =useState (false)
  const [messageApi, inputErrorMassage] = notification.useNotification();
  const { currentInstructor } = useSelector((state) => state.instrutor)
  const [video, setVideo] = useState({

    chapterName: "",
    subChapter: "",
    date: "",
    batch: "",
   subject:currentInstructor.subject,
   videoUrl:"",


  });

  const videoInputHandler = (e) => {
    setVideo({
      ...video, [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    axios.get(`https://dreamsachool-y2s8.onrender.com/api/student/bacth`).then((res) => {
      setBatch(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])



  const videoHandler = () => {



 if(video.chapterName===""){
  messageApi.error({
    message: `Chapter Name Filed Error`,
    description: `{Please enter chapter name}`,
    placement: 'top',
  })
return false
 
 }
 if(video.subChapter===""){
  messageApi.error({
    message: `Sub Chapter Field Error`,
    description: `{Please enter sub chapter name}`,
    placement: 'top',
  })
return false
 
 }
 if(video.date===""){
  messageApi.error({
    message: `Date Field Error `,
    description: `{Please choose date file}`,
    placement: 'top',
  })
 
  return false
 }

 if(video.batch===""){
  messageApi.error({
    message: `Batch Field Eroor`,
    description: `{Select batch name}`,
    placement: 'top',
  })
return false
 } 

 if(video.videoUrl===null ||video.videoUrl===""){
  messageApi.error({
    message: `Video url Field Error`,
    description: `{Please enter video url}`,
    placement: 'top',
  })
 
  return false;
 }


    setLoading(true)
    axios.post('https://dreamsachool-y2s8.onrender.com/api/video/add',{...video}).then((res) => {
      setLoading(false)
      console.log(res.data);
      messageApi.success({
        message: `Video upload Success`,
        description: `${res.data.massage}`,
        placement: 'top',

      })

  
  setVideo({
        chapterName: "",
        subChapter: "",
        date: "",
        batch: "",
        videoUrl:""
       })
    }).catch((err) => {
      messageApi.error({
        message: `Video upload filed `,
        description: `${err.response?.data?.massage || "Internal server  error"}`,
        placement: 'top',

      });
      setLoading(false)
    return false
    })
 

  }


  return (

    <div className={vedioStyle.mainContainer} >

      {inputErrorMassage}

      <div className={vedioStyle.imgs}>
        <img src={liveLogo} alt="" height='100%' width='95%' />
      </div>


      <div className={vedioStyle.form}>

        <div className={vedioStyle.formHeading}>
          <p>Upload recorded lecture video</p>
        </div>

        <div className={vedioStyle.linkinput}>
          <input type="text" style={{ width: "100%" }} value={video.chapterName} placeholder='Enter Chapter Title' name="chapterName" onChange={videoInputHandler} />
          <input type="text" style={{ width: "100%" }} value={video.subChapter} placeholder='Enter Chapter Subtitle' name="subChapter" onChange={videoInputHandler} />

        </div>

        <div className={vedioStyle.linkDiv}>

          <input type="datetime-local" placeholder='12:00am' value={video.date} name="date" onChange={videoInputHandler} />

          {/* ===================================================================*/}
          <select name="batch" value={video.batch} onChange={videoInputHandler}>
            <option >{"batch"}</option>
            {
              batch.map((batch) => (
                <option value={batch}>{batch}</option>
              ))
            }
          </select>
        </div>

        <div className={vedioStyle.linkinput}>
          <label htmlFor=""  style={{fontSize:"14px"}}>video file<sup>*</sup></label> <br />
          <input type={"text"} style={{ width: "100%" }}  name='videoUrl' value={video.videoUrl}  
          placeholder='Enter upload video url'
          onChange={videoInputHandler}/>
    
        
        </div>
        <div style={{width:"100%",padding:"0px 10px"}}>
        <button className={vedioStyle.button} onClick={videoHandler}>{(loading)?"loading...":'Upload video'} </button>
   </div>
      </div>
    </div >
  )
}

export default Video;
