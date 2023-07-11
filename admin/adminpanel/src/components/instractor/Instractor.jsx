import React, { useEffect, useState } from 'react'
import instrctorStyle from "./Instractor.module.css"
import { MdPersonAddAlt1 } from "react-icons/md"
import { Button, Modal, Pagination, Progress, Spin, notification } from 'antd'
import axios from 'axios'
import { FaChalkboardTeacher } from "react-icons/fa"
import { RiEnglishInput } from "react-icons/ri"
import { TbMathFunctionOff } from "react-icons/tb"
import { GiMaterialsScience } from "react-icons/gi"
import { FiTrello } from "react-icons/fi"
import moment from "moment"

const Instractor = () => {
  const [instructorData, setInstructorData] = useState([]);
  const [api, contextHolder] = notification.useNotification()
  const [loging, setLogin] = useState(false);
  const [totalPage, setPageTotal] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5)

  const allInstructorData = () => {
    setLogin(true)
    axios.get(`https://dearmschool.com/api/instractor`).then((res) => {
      setPageTotal(res.data.length);
      setInstructorData(res.data);
      setTimeout(() => {
        setLogin(false)
      }, 1000)

    }).catch((err) => {
      setLogin(false)
      throw err;
    })
  }

  useEffect(() => {
    allInstructorData()
  }, [])

  const instructordelete = (id) => {

    axios.delete(`https://dearmschool.com/api/instractor/delete?id=${id}`).then((res) => {
      api.success({

        message: `Instructor Deletion Success`,
        description: `${res.data.massage}`,
        placement: "top",
      });
      allInstructorData()
      return false
    }).catch((err) => {
      api.error({
        message: `Instructor Deletion Field`,
        description: `${err.response.data.massage || "Internal Sever Error"}`,
        placement: "top",
      });
      return false
    })

  }
const presentHandler=(id)=>{
  axios.put(`https://dearmschool.com/api/addinstructorpresent?id=${id}`)
  .then((res)=>{
    api.success({
      message: `Instructor attendense Success`,
      description: `${res.data.massage}`,
      placement: "top",
    })
    allInstructorData()
  }).catch((err)=>{
    api.error({
      message: `Instructor attendense Field`,
      description: `${err.response.data.massage || "Internal Sever Error"}`,
      placement: "top",
    });
  })


}

const absentHandler=(id)=>{
  axios.put(`https://dearmschool.com/api/addinstructorabsent?id=${id}`)
  .then((res)=>{
    api.success({
      message: `Instructor attendense Success`,
      description: `${res.data.massage}`,
      placement: "top",
    })
    allInstructorData()
  }).catch((err)=>{
    api.error({
      message: `Instructor attendense Field`,
      description: `${err.response.data.massage || "Internal Sever Error"}`,
      placement: "top",
    });
  })


}







  const lastIndex = currentPage * pageSize;
  const fastIndex = lastIndex - pageSize;
  const InstractorsData = instructorData.slice(fastIndex, lastIndex)

  const mathInstructor = instructorData.filter((item)=>{
    const math = item.subject==="math" ;
    return math;
  })

  const enlishInstructor = instructorData.filter((item)=>{
    const english = item.subject==="english" ;
    return english;
  })

  const hindiInstructor = instructorData.filter((item)=>{
    const hindi = item.subject==="hindi" ;
    return hindi;
  })

  const scienceInstructor = instructorData.filter((item)=>{
    const science = item.subject==="science" ;
    return science;
  })

  return (
    <div className={instrctorStyle.instractorMainContenair}>
  
          {contextHolder}
          <div className={instrctorStyle.InstractorDeteils}>
            <div >
              <p style={{fontSize:"22px",color:"lightsalmon"}}>Instructor</p>

              <section style={{display:"flex",color:"lightsalmon",alignItems:"center",justifyContent:"center",gap:"10px"}}>
               <FaChalkboardTeacher size={30} />
                <span style={{fontSize:"22px",color:"lightsalmon"}}>{instructorData.length}</span>
              </section>
            </div>


            <div>
              <p style={{fontSize:"22px",color:"lightgreen"}}>Math</p>
              <section style={{display:"flex",color:"lightgreen",alignItems:"center",justifyContent:"center",gap:"10px"}}>
                <TbMathFunctionOff  size={30} />
                <span style={{fontSize:"22px",color:"lightgreen"}}>{mathInstructor.length}</span>
              </section>

            </div>
            <div>

              <p style={{fontSize:"22px",color:"lightseagreen"}}>English</p>
              <section style={{display:"flex",color:"lightseagreen",alignItems:"center",justifyContent:"center",gap:"10px"}}>
                <RiEnglishInput size={30} />
                <span style={{fontSize:"22px",color:"lightseagreen"}}>{enlishInstructor.length}</span>
              </section>
            </div>


            <div>
              <p style={{fontSize:"22px",color:"sandybrown"}}>Hindi</p>
              <section style={{display:"flex",color:"sandybrown",alignItems:"center",justifyContent:"center",gap:"10px"}}>
                <FiTrello size={30} />
                <span style={{fontSize:"22px",color:"sandybrown"}}>{hindiInstructor.length}</span>
              </section>

            </div>
            <div>
              <p style={{fontSize:"22px",color:"#ffff66"}}>Science</p>
              <section style={{display:"flex",color:"#ffff66",alignItems:"center",justifyContent:"center",gap:"10px"}}>
                <GiMaterialsScience size={30} />
                <span style={{fontSize:"22px",color:"#ffff66"}}>{scienceInstructor.length}</span>
              </section>

            </div>

          </div>

          <div className={instrctorStyle.addbtn} >
            <Button onClick={allInstructorData}>Refresh</Button>
            <SignupModel allInstructorData={allInstructorData}/>
          </div>
          <div>
            {
              (loging)?  <div style={{height:"59vh",display:"flex",justifyContent:"center",alignItems:"center"}}><Spin  size={'large'}/></div> 
          
          :<div className={instrctorStyle.Instructor}>
       
            <table border={0} cellSpacing={0} cellPadding={0} >
              <thead >
                <th>Name</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Joining</th>
                <th>Subscription</th>
                <th>Present</th>
                <th>Absent</th>

                 <th>Totol Attendance</th>
                <th>Update</th>
                <th>Delete</th>
              </thead>
              <tbody >
                {
                  InstractorsData.map((data, ind) => (
                    <tr key={ind}>
                      <td>{data.name}</td>
                      <td>{data.phone}</td>
                      <td>{data.subject}</td>
                      <td>{moment(data.joining).format("DD/MM/YYYY")}</td>
                      <td>{data.subscription}</td>
                      <td><Button style={{background:"lightgreen"}} onClick={()=>presentHandler(data._id)} >P</Button></td>
                      <td><Button  type='primary' danger onClick={()=>absentHandler(data._id)} >a</Button></td>
                     
                      <td>{(`Present ${data.present}/ Absent ${data.absent}`)}</td>

                      <td>
                        <InstructorUpdateModel refresh={allInstructorData} id={data._id} email={data.email} name={data.name} phone={data.phone} 
                        joining={data.joining} subscription={data.subscription} subject={data.subject}
                        />
                      </td>
                      <td>
                        <Button type="primary" danger onClick={() => instructordelete(data._id)}>Delete</Button>
                      </td>
                    </tr>

                  ))}




              </tbody>
            </table>
    
            <div style={{width:"100%",display:"flex",justifyContent:"end",alignItems:"end"}}>
            <Pagination current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} total={totalPage} />
          </div>
    
          </div>
}
        </div>
    
    </div>
  )
}

export default Instractor


const SignupModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImg,setProfileImg] = useState(null)
  const [api, contextHolder] = notification.useNotification()
  const [loading,setLoading] = useState(false)
  const [progress,setProgess]=useState("")
  const [resetFile,setResetFile] = useState("file")
  const [instructorUpdate,setInstructorUpdate] =useState({
    name:"",
    email:"",
    subject:"",
    joining:"",
    phone:"",
    subscription:"",
    password:"",
    confirmPassword:""
  })

  const instractorInput =(e)=>{
   setInstructorUpdate({
    ...instructorUpdate,[e.target.name]:e.target.value
   })
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = ({allInstructorData}) => {
    console.log(instructorUpdate);
    const mailformat = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
     const numberformet = new RegExp('^[0-9]{10}$') 
 

    if(instructorUpdate.name===''||instructorUpdate.name===null ){
      api.error({
        message: `Instructor Name Required`,
          description: `Please enter instructor name`,
          placement: "top",
        });
        return false;
    }
 if(instructorUpdate.name.length<3){
    api.error({
      message: `Instructor Name Error`,
        description: `Enter name more than 3 charector`,
        placement: "top",
      });
      return false;
  }

  if(instructorUpdate.name.length>15){
    api.error({
      message: `Instructor Name Error`,
        description: `Enter name less then 15 charector`,
        placement: "top",
      });
      return false;
  }
 
  if(((/[A-z]+\d/g).test(instructorUpdate.name))){
    api.error({
      message: `Instructor Name Error`,
        description: `Enter name only charector`,
        placement: "top",
      });
      return false;
  }
 
 if(instructorUpdate.email==="" || instructorUpdate.email===null){
    api.error({
      message: `Instructor Email Required`,
        description: `Please enter instructor email`,
        placement: "top",
      });
      return false;

  }

   if(!instructorUpdate.email.match(mailformat)){
      api.error({
        message: `Instructor Email Required`,
        description: `Please enter valid email`,
        placement: "top",
      });
      return false;

  }

  if(instructorUpdate.phone==="" || instructorUpdate.phone===null){
    api.error({
      message: `Instructor Phone Required`,
        description: `Enter instructor phone number `,
        placement: "top",
      });
      return false;

  }
  if(!instructorUpdate.phone.match(numberformet)){
    api.error({
      message: `Instructor Phone Required`,
        description: `Enter phone number only digit`,
        placement: "top",
      });
      return false;

  }
  if(instructorUpdate.phone.length<10 || instructorUpdate.phone.length>10){
    api.error({
      message: `Instructor Phone Error`,
        description: `Enter 10 digit phone number`,
        placement: "top",
      });
      return false;

  }
 if(instructorUpdate.joining==="" || instructorUpdate.joining===null){
    api.error({
      message: `Instructor Joining Required`,
        description: `Please select instructor joining date`,
        placement: "top",
      });
      return false;

  }


 if(instructorUpdate.subject==="" || instructorUpdate.subject===null){
    api.error({
      message: `Instructor Subject Required`,
        description: `Please select instructor subject`,
        placement: "top",
      });
      return false;

  }


  if(instructorUpdate.subscription==="" || instructorUpdate.subscription===null){
    api.error({
      message: `Instructor Subscription Required`,
        description: `Please select instructor subscription`,
        placement: "top",
      });
      return false;

  }



 if(instructorUpdate.password==="" || instructorUpdate.password===null){
    api.error({
      message: `Instructor Password Required`,
        description: `Please enter instructor Password`,
        placement: "top",
      });
      return false;

  }

  if(instructorUpdate.password.length<8 || instructorUpdate.password.length >8){
    api.error({
      message: `Instructor Password Error`,
        description: `Enter password minimum 8 digit  `,
        placement: "top",
      });
      return false;

  }

 if(instructorUpdate.confirmPassword==="" || instructorUpdate.confirmPassword===null){
    api.error({
      message: `Instructor Confirm Passwod  Required`,
        description: `Enter password minimum 8 digit  `,
        placement: "top",
      });
      return false;

  }

 if(instructorUpdate.confirmPassword !==instructorUpdate.password){
    api.error({
      message: `Instructor Confirm Password Error`,
        description: `Confirm password does not match`,
        placement: "top",
      });
      return false;

  }

 if(profileImg===null || profileImg===""){
    api.error({
      message: `Instructor Profile Image Error`,
        description: `Please choose profile image`,
        placement: "top",
      });
      return false;

  }

 

    const formData = new FormData();
    formData.append("name",instructorUpdate.name)
    formData.append("email",instructorUpdate.email)
    formData.append("phone",instructorUpdate.phone)
    formData.append("subject",instructorUpdate.subject)
    formData.append("joining",instructorUpdate.joining)
    formData.append("password",instructorUpdate.password)
    formData.append("subscription",instructorUpdate.subscription)
    formData.append("profileImg",profileImg)

  setLoading(true)
    axios.post(`https://dearmschool.com/api/instractor/signup`,formData,{
      onUploadProgress: (event) => {
        const Progessdata = (Math.round((event.loaded * 100) / event.total))
        setProgess(Progessdata)
      },
    }).then((res)=>{

      api.success({
      message: `Instructor Ragistration Success`,
        description: `${res.data.massage}`,
        placement: "top",
      });
      setLoading(false)
      setProgess(null)
 
      setInstructorUpdate({
        name:"",
        email:"",
        subject:"",
        joining:"",
        phone:"",
        subscription:"",
        password:"",
        confirmPassword:""
      })
    
    }).catch((err)=>{
      api.error({
        message: `Instructor Ragistration Field`,
          description: `${err.response.data.massage ||"Internal Server Error"}`,
          placement: "top",
        });
      setLoading(false)
      setProgess(null)
    
      return false;
    })
    setResetFile('text')
  setTimeout(() => {
    setResetFile('file')
    }, 0);
  
  };
    

 

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    {contextHolder}
      <button  onClick={showModal}> <MdPersonAddAlt1 size={22} /> Instructor</button>
      <Modal title="Instructor Ragistration" open={isModalOpen} onOk={handleOk} okText={(loading)?"Loading...":"Ragister now"} onCancel={handleCancel}>
        <div className={instrctorStyle.addInstructorformDiv}>
          <div className={instrctorStyle.addInstructorSection}>
            <div className="">
              <label htmlFor="">Name <sup>*</sup></label>
              <input type="text" name='name' placeholder='Enter instructor name'
               value={instructorUpdate.name} onChange={instractorInput} />
            </div>
            <div className="">
              <label htmlFor="">Email <sup>*</sup></label>
              <input type="text" name='email' placeholder='Enter instructor email'
               value={instructorUpdate.email} onChange={instractorInput} />
            </div>
          </div>
         
          <div  className={instrctorStyle.addInstructorSection}>
            <div className="">
              <label htmlFor="">Phone <sup>*</sup></label>
              <input type="text" name='phone' placeholder='Enter phone number'
               value={instructorUpdate.phone} onChange={instractorInput} />
            </div>
            <div className="">
            <label htmlFor="">Joining <sup>*</sup></label>
              <input type="date" name='joining'
               value={instructorUpdate.joining} onChange={instractorInput} />
         </div>
               
          
          </div>

          <div  className={instrctorStyle.addInstructorSection}>
         
 
            <div className="">
                 <label htmlFor="">Subject <sup>*</sup></label>
              <select name='subject' value={instructorUpdate.subject} onChange={instractorInput} >
                <option >Select Subject</option>
                <option value="math" >Math</option>
                <option value="english">English</option>
                <option value="science">Science</option>
                <option value="hindi"> Hindi</option>

                </select>
            </div>
            <div className="">
                 <label htmlFor="">Subscription <sup>*</sup></label>
                 <select name='subscription' value={instructorUpdate.subscription} onChange={instractorInput} >
                 <option >Select Subscription</option>
                 <option value="false">False</option>
                 <option value="true">True</option>

               </select>
            </div>
       
          </div>

          <div  className={instrctorStyle.addInstructorSection}>
            <div className="">
       
                 <label htmlFor="">Password <sup>*</sup></label>
              <input type="password" name='password' placeholder='Enter 8 digit password'
               value={instructorUpdate.password} onChange={instractorInput} />
            </div>
       
          
            <div className="">
            
              <label htmlFor=""> Confirm Password <sup>*</sup></label>
              <input type="text" name='confirmPassword'  placeholder='Enter confirm password'
               value={instructorUpdate.confirmPassword} onChange={instractorInput} />

            </div>
          </div>

          <div  className={instrctorStyle.addInstructorSectionFile}>
            <label htmlFor="">Profile image <sup>*</sup> </label>
            <br/>
              <input style={{ backgroundColor:'transparent',outline:"none",border:"none"
            }} type={resetFile} name="profileImg" onChange={(e)=>setProfileImg(e.target.files[0])}/>
              {
               progress &&  <Progress percent={progress}/>
              }
         
          </div>

        </div>
      </Modal>
    </>
  )
}


const InstructorUpdateModel = ({id,name,joining,phone,subject,email,subscription,refresh}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImg,setProfileImg] = useState(null)
  const [api, contextHolder] = notification.useNotification()
  const [loading,setLoading] = useState(false)
  const [progress,setProgess]=useState("")
  const [resetFile,setResetFile] = useState("file")
  const [instructorUpdate,setInstructorUpdate] =useState({
    name:"",
    email:"",
    subject:"",
    joining:"",
    phone:"",
    subscription:""
 
  })

  useEffect(()=>{
    setInstructorUpdate({
      id:id,
      name:name,
      email:email,
      subject:subject,
      joining:joining,
      phone:phone,
      subscription:subscription
    })
  },[id])

  const instractorInput =(e)=>{
   setInstructorUpdate({
    ...instructorUpdate,[e.target.name]:e.target.value
   })
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log('update',instructorUpdate);
    const formData = new FormData();
    formData.append("id",instructorUpdate.id)
    formData.append("name",instructorUpdate.name)
    formData.append("email",instructorUpdate.email)
    formData.append("phone",instructorUpdate.phone)
    formData.append("subject",instructorUpdate.subject)
    formData.append("joining",instructorUpdate.joining)
    formData.append("subscription",instructorUpdate.subscription)
    formData.append("profileImg",profileImg)

  setLoading(true)
    axios.put(`https://dearmschool.com/api/instractor/update`,formData,{
      onUploadProgress: (event) => {
        const Progessdata = (Math.round((event.loaded * 100) / event.total))
        setProgess(Progessdata)
      },
    }).then((res)=>{
 console.log('update',res.data);
      api.success({
      message: `Instructor Updation Success`,
        description: `${res.data.massage}`,
        placement: "top",
      });
      setLoading(false)
      setProgess(null)
 
      setInstructorUpdate({
        name:"",
        email:"",
        subject:"",
        joining:"",
        phone:"",
        subscription:"",
      
      })
    
    }).catch((err)=>{
      api.error({
        message: `Instructor Updation Field`,
          description: `${err.response.data.massage ||"Internal Server Error"}`,
          placement: "top",
        });
      setLoading(false)
      setProgess(null)
    
      return false;
    })
    setResetFile('text')
  setTimeout(() => {
    setResetFile('file')
    refresh()
},500);
 

};
    

const handleCancel = () => {
    setIsModalOpen(false);
}

  return (
    <>
  <>
    {contextHolder}
      <Button  type='primary' onClick={showModal}> Update </Button>

      <Modal title="Instructor Update " open={isModalOpen} onOk={handleOk} okText={(loading)?"Loading...":"Update now"} onCancel={handleCancel}>
        <div className={instrctorStyle.addInstructorformDiv}>
          <div className={instrctorStyle.addInstructorSection}>
            <div className="">
              <label htmlFor="">Name <sup>*</sup></label>
              <input type="text" name='name' placeholder='Enter instructor name'
               value={instructorUpdate.name} onChange={instractorInput} />
            </div>
            <div className="">
              <label htmlFor="">Email <sup>*</sup></label>
              <input type="text" name='email' placeholder='Enter instructor email'
               value={instructorUpdate.email} onChange={instractorInput} />
            </div>
          </div>
         
          <div  className={instrctorStyle.addInstructorSection}>
            <div className="">
              <label htmlFor="">Phone <sup>*</sup></label>
              <input type="text" name='phone' placeholder='Enter phone number'
               value={instructorUpdate.phone} onChange={instractorInput} />
            </div>
            <div className="">
            <label htmlFor="">Joining <sup>*</sup></label>
              <input type="date" name='joining'
               value={instructorUpdate.joining} onChange={instractorInput} />
         </div>
               
          
          </div>

          <div  className={instrctorStyle.addInstructorSection}>
         
 
            <div className="">
                 <label htmlFor="">Subject <sup>*</sup></label>
              <select name='subject' value={instructorUpdate.subject} onChange={instractorInput} >
                <option >Select Subject</option>
                <option value="math" >Math</option>
                <option value="english">English</option>
                <option value="science">Science</option>
                <option value="hindi"> Hindi</option>

                </select>
            </div>
            <div className="">
                 <label htmlFor="">Subscription <sup>*</sup></label>
                 <select name='subscription' value={instructorUpdate.subscription} onChange={instractorInput} >
                 <option >Select Subscription</option>
                 <option value="false">False</option>
                 <option value="true">True</option>

               </select>
            </div>
       
          </div>

     

          <div  className={instrctorStyle.addInstructorSectionFile}>
            <label htmlFor="">Profile image <sup>*</sup> </label>
            <br/>
              <input style={{ backgroundColor:'transparent', outline:"none",border:"none"
            }} type={resetFile} name="profileImg" onChange={(e)=>setProfileImg(e.target.files[0])}/>
              {
               progress &&  <Progress percent={progress}/>
              }
         
          </div>

        </div>
      </Modal>
    </>
    </>
  )
}


