import React, { useEffect, useState } from 'react'
import courseCardStyle from "../../css/course/Coursecard.module.css"
import { Avatar, Button, Card, Rate } from "antd"
import girlImg from "../../../assets/educationgirl.png"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const CourseCart = () => {
  const [allCourse,setAllCourse] =useState([]);
   const nevigate = useNavigate();

   useEffect(()=>{
    //get all course 
    axios.get("https://dearmschool.com/api/getcourse").then((res)=>{
      setAllCourse(res.data);
    }).catch((err)=>{
      throw err
 
    })

   },[])

  return (
  
     <div className={courseCardStyle.mainbox}>
    <div className={courseCardStyle.headingTitle}>
          <h1> Dreams School Featured Course </h1>
      <div className={courseCardStyle.fistHeqding} >
        <div>
      <span>What's is new</span>
      <h4 >Dreams School Class Category</h4>
      <p>
      Dreams school is an e-learning platform in india. 
      it provides high education for all state boards and more than high facility with live classes with top instructors and mentors.
      </p>
      </div>
      <h3 onClick={()=>nevigate("/course")} >View all</h3>
     
      </div>
  
    </div>
 
    <div className={courseCardStyle.courseContenar}>
{allCourse.map((item)=>(
      <div className={courseCardStyle.courseCard}>
        <img src={item.imageUrl} alt={''} className="course-image" />

        <div className={courseCardStyle.boardClassSection}>

          <div className={courseCardStyle.boardLogo}>
            <Avatar src={item.boardUrl} size={40} />
            <span className="boardName" style={{textTransform:"uppercase",fontSize:"14px"}}>{item.boardName}</span>
          </div>

        </div>
        <br />
         <div className={courseCardStyle.priceInfo}>
          <span className={courseCardStyle.classText}>{item.subject}</span>
          <span className={courseCardStyle.price}>{item.price} &#8377; monthly</span>
         </div>

        <hr className={courseCardStyle.hrLine} />
        <div className={courseCardStyle.enrollSection}>
          <span>{item.status}</span>
          <span>{item.start}</span>
          <button className={courseCardStyle.enrollbtn} type='primary' size='large' 
      onClick={()=>nevigate(`/course?type=${item.boardName}`)}
          >Join Now </button>
        </div>
      </div>
      ))
} 
 


 
</div>
</div>
  )
}

export default CourseCart



