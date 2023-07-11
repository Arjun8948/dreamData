import React, { useEffect, useState } from 'react'

import notesStyle from "./Notes.module.css"

import { Button, Card, Input, Progress, Select, Upload } from 'antd'
import liveLogo from '../../../assets/class.jpg'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { notification } from 'antd';
 

export const NotePage = () => {
  const [messageApi, inputErrorMassage] = notification.useNotification();
  const { currentInstructor } = useSelector((state) => state.instrutor)
  const [resetInput, setResetInput] = useState("file")
  const [loading,setLoading]=useState(false)
  const [progess,setProgress]= useState(null);

  const [notes, setNotes] = useState({

    chapterName: "",
    subChapter: "",
    date: "",
    batch: ""


  });
  const [batch, setBatch] = useState([]);
  const [notesFile, setNotesFile] = useState(null)
  useEffect(() => {
    axios.get(`https://dreamsachool-y2s8.onrender.com/api/student/bacth`).then((res) => {
      setBatch(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const noteInputHandler = (e) => {
    setNotes({
      ...notes, [e.target.name]: e.target.value
    })

  }
  const notesUplodehandler = () => {

    if(notes.chapterName===""){
      messageApi.error({
        message: `Chapter Name Filed Error`,
        description: `{Please enter chapter name}`,
        placement: 'top',
      })
    return false
     
     }
     if(notes.subChapter===""){
      messageApi.error({
        message: `Sub Chapter Field Error`,
        description: `{Please enter sub chapter name}`,
        placement: 'top',
      })
    return false
     
     }
     if(notes.date===""){
      messageApi.error({
        message: `Date Field Error `,
        description: `{Please choose date file}`,
        placement: 'top',
      })
     
      return false
     }
    
     if(notes.batch===""){
      messageApi.error({
        message: `Batch Field Eroor`,
        description: `{Select batch name}`,
        placement: 'top',
      })
    return false
     } 
    
     if(notesFile===null ||notesFile===""){
      messageApi.error({
        message: `notes File Field Error`,
        description: `{Please choose notes file}`,
        placement: 'top',
      })
     
      return false;
     }
    const formData = new FormData();

    formData.append('chapterName', notes.chapterName)
    formData.append('subChapter', notes.subChapter)
    formData.append('subject', currentInstructor.subject)
    formData.append('date', notes.date)
    formData.append('batch', notes.batch)
    formData.append('notes', notesFile)

    console.log(formData);
    setLoading(true)
    axios.post('https://dreamsachool-y2s8.onrender.com/api/notes/add', formData, {
      onUploadProgress:(data)=>{
        const percent = (Math.round((data.loaded*100)/data.total))
        setProgress(percent)
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      messageApi.success({
        message: `Notes upload Success`,
        description: `${res.data?.massage}`,
        placement: 'top',

      })
    setLoading(false)
     setProgress(null)
    }).catch((err) => {
      messageApi.error({
        message: `Notes upload filed `,
        description: `${err.response?.data?.massage || "Internal server  error"}`,
        placement: 'top',

      });
    setLoading(false)
    return false
    })
  
    setResetInput("text")
    setTimeout(() => {
      setNotes({
        chapterName: "",
        subChapter: "",
        date: "",
        batch: ""
  
  
      })
      setResetInput("file")
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
          <p>Upload today class lecture notes</p>
        </div>

        <div className={notesStyle.linkinput}>
          <input type="text" style={{ width: "100%" }} value={notes.chapterName} placeholder='Enter Chapter Title' name="chapterName" onChange={noteInputHandler} />
          <input type="text" style={{ width: "100%" }} value={notes.subChapter} placeholder='Enter Chapter Subtitle' name="subChapter" onChange={noteInputHandler} />

        </div>

        <div className={notesStyle.linkDiv}>

          <input type="datetime-local" placeholder='12:00am' value={notes.date} name="date" onChange={noteInputHandler} />



          {/* ===================================================================*/}
          <select name="batch" value={notes.batch} onChange={noteInputHandler} >
            <option >{"batch"}</option>
            {
              batch.map((batch) => (
                <option value={batch}>{batch}</option>
              ))
            }
          </select>
        </div>

       <div className={notesStyle.linkinput}>
        <label htmlFor=""  style={{fontSize:"14px"}}>notes pdf file<sup>*</sup></label> <br />

          <input type={resetInput} name='notes' onChange={(e) => setNotesFile(e.target.files[0])} style={{ width: "100%" }} accept="application/pdf"/>
          { progess && <Progress percent={progess} size="small" style={{width:"100%",margin:"0px 20px"}} />}

        </div>
        <div style={{width:"100%",padding:"0px 10px"}}>
        <button className={notesStyle.button} onClick={notesUplodehandler}  >{(loading)?"loading...":'Upload Notes'}</button>
</div>
      </div>
    </div >
  )
}

export default NotePage
