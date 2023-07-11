import React, { useEffect, useState } from 'react'
import notesStyle from "./assignment.module.css"
import { Button, Card, Input, Progress, Select } from 'antd'
import liveLogo from '../../../assets/class.jpg'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { notification } from 'antd';

const Assignment = () => {
  const [batch,setBatch] =useState([]);
  const [messageApi, inputErrorMassage] = notification.useNotification();
  const { currentInstructor } = useSelector((state) => state.instrutor)
  const [resetInput,setResetInput] = useState("file")
  const [assignmentFile,setAssignmentFile] =useState(null)
  const [progess,setProgress]= useState(null);

  const [loading,setLoading] =useState (false)

  const [assignment,setAssignment] =useState({

    chapterName:"",
    subChapter:"",
    date:"",
    batch:""
});


  
  useEffect(()=>{
    axios.get(`https://dreamsachool-y2s8.onrender.com/api/student/bacth`).then((res)=>{
      setBatch(res.data)
    }).catch((err)=>{
  console.log(err);
    })
  },[])
  
  const assignmentInputHandler =(e)=>{
    setAssignment({
      ...assignment,[e.target.name]:e.target.value
    })

  }
const assignmentUplodeHandler =()=>{

  if(assignment.chapterName===""){
    messageApi.error({
      message: `Chapter Name Filed Error`,
      description: `{Please enter chapter name}`,
      placement: 'top',
    })
  return false
   
   }
   if(assignment.subChapter===""){
    messageApi.error({
      message: `Sub Chapter Field Error`,
      description: `{Please enter sub chapter name}`,
      placement: 'top',
    })
  return false
   
   }
   if(assignment.date===""){
    messageApi.error({
      message: `Date Field Error `,
      description: `{Please choose date file}`,
      placement: 'top',
    })
   
    return false
   }
  
   if(assignment.batch===""){
    messageApi.error({
      message: `Batch Field Eroor`,
      description: `{Select batch name}`,
      placement: 'top',
    })
  return false
   } 
  
   if(assignmentFile===null ||assignmentFile===""){
    messageApi.error({
      message: `assignment File Field Error`,
      description: `{Please choose assignment file}`,
      placement: 'top',
    })
   
    return false;
   }
 
      const formData = new FormData();
  
      formData.append('chapterName',assignment.chapterName)
      formData.append('subChapter',assignment.subChapter)
      formData.append('subject',currentInstructor.subject)
      formData.append('date',assignment.date)
      formData.append('batch',assignment.batch)
      formData.append('assignment',assignmentFile)

console.log(formData);
setLoading(true)
  axios.post('https://dreamsachool-y2s8.onrender.com/api/assignment/add',formData,{
    onUploadProgress:(data)=>{
      const percent = (Math.round((data.loaded*100)/data.total))
      setProgress(percent)
    },
    headers:{
      'Content-Type':'multipart/form-data'
    }
  }).then((res)=>{
    messageApi.success({
      message: `Assignment upload Success`,
      description: `${res.data?.massage}`,
      placement: 'top',

  })
 setProgress(null)

setLoading(false)
  
  }).catch((err)=>{
    messageApi.error({
      message: `Assignment upload filed `,
      description: `${err.response?.data?.massage|| "Internal server  error"}`,
      placement: 'top',

  });
setLoading(false)
return false
  })
 setProgress(null)
  setResetInput("text")
  setTimeout(()=>{
    setAssignment({
      chapterName:"",
      subChapter:"",
      date:"",
      batch:""
  
  
    })
    setResetInput("file")
    setProgress(null)

  },0)
} 

  return (
    <div className={notesStyle.mainContainer} >
                {inputErrorMassage}

       <div className={notesStyle.imgs}>


        <img src={liveLogo} alt="" height='100%' width='95%' />
      </div>


      <div className={notesStyle.form}>

        <div className={notesStyle.formHeading}>
          <p>Upload today assignment</p>
        </div>

        <div className={notesStyle.linkinput}>
          <input type="text" style={{ width: "100%" }} value={assignment.chapterName}  placeholder='Enter Chapter Title' name="chapterName" onChange={assignmentInputHandler} />
          <input type="text" style={{ width: "100%" }} value={assignment.subChapter} placeholder='Enter Chapter Subtitle' name="subChapter" onChange={assignmentInputHandler}  />
        
        </div>

        <div className={notesStyle.linkDiv}>

        <input type="datetime-local" placeholder='12:00am' value={assignment.date}   name="date" onChange={assignmentInputHandler}  />

{/* ===================================================================*/}
<select name="batch" value={assignment.batch} onChange={assignmentInputHandler} >
          <option >{"batch"}</option>
          {
            batch.map((batch)=>(
              
              <option value={batch}>{batch}</option>
            ))
          }
         </select>
          </div>

        <div className={notesStyle.linkinput}>
        <label htmlFor=""  style={{fontSize:"14px"}}>assignment file<sup>*</sup></label> <br />

        <input type={resetInput} name='assignment'  onChange={(e)=>setAssignmentFile(e.target.files[0])}  style={{ width: "100%" }}  />
        { progess && <Progress percent={progess} size="small" style={{width:"100%",margin:"0px 20px"}} />}
     
        </div>
        <div style={{width:"100%",padding:"0px 10px"}}>
        <button className={notesStyle.button} type='primary' onClick={assignmentUplodeHandler}  >{(loading)?'loading...':'Upload Assignment'}</button>
        </div>
      </div>
    </div >
  )
}

export default Assignment
