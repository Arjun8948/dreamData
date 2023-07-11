import React, { useEffect, useState } from 'react'
import dashPageStyle from "./dashboardPage.module.css"
 import {Button}  from "antd"
import { useSelector } from 'react-redux';
import axios from "axios"
import moment from 'moment';

const DashBoard = () => {
  const [classLink, setClassLink] = useState({});
  const { currentInstructor } = useSelector((state) => state.instrutor)
  const [chartData,setChartData] =useState([])
  useEffect(() => {
    axios.get(`https://dreamsachool-y2s8.onrender.com/api/classlink/get?instructorId=${currentInstructor._id}&subject=${currentInstructor.subject}`)
    .then((res) => setClassLink(res.data)).catch((err) => { throw err })
   axios.get(`https://dreamsachool-y2s8.onrender.com/api/instractor?id=${currentInstructor._id}`).then((res)=>{
      setChartData(res.data)
   }).catch((err) => { throw err })

  }, [])
  console.log(chartData);

  return (
    < div className={dashPageStyle.mainDashContenar}>

      <div className={dashPageStyle.classInfoCart}>

        <div className={dashPageStyle.classInfoCarts} >
          <div className={dashPageStyle.class}>
            <div className={dashPageStyle.classcartInfoStyle1}  >
             <p> Chapter </p>
              <span> {classLink[0]?.chapterName} </span>
            </div>
            <div className={dashPageStyle.classcartInfoStyle1} >
              <p >subtitle</p>
              <span> {classLink[0]?.subChapter} </span>
            </div>
           
            <div className={dashPageStyle.classstyle}>
              <a href={classLink[0]?.classLink} target='_blank'>Join</a>
            </div>
          </div>

        </div>
        <div className={dashPageStyle.classInfoCarts} >
          <div className={dashPageStyle.class}>

            <div className={dashPageStyle.classcartInfoStyle} >
              <p > Batch  </p>
              <span>{classLink[0]?.batch} </span>
            </div>

            <div className={dashPageStyle.classcartInfoStyle} >
              <p>   Subject </p>
              <span>  {classLink[0]?.subject} </span>
            </div>


            <div className={dashPageStyle.classcartInfoStyle}>
              <p>  timing</p>
             <span style={{textTransform:"uppercase"}}>  {moment(classLink[0]?.date).format("hh:mm a")} </span>
            </div>

           <div className={dashPageStyle.classcartInfoStyle}>
              <p>  Date </p>

              <span> {moment(classLink[0]?.date).format("Do MMMM yyyy")} </span>
            </div>

          </div>

        </div>


      </div>

      <div className={dashPageStyle.chart} >
 <div style={{width:"45%",height:"135px"}}>

 <Button type='primary'   style={{width:"100%",
  opacity:0.4,
 height:"100%"}}>
 <h2 style={{textAlign:"center",fontStyle:"italic"}}>Total Present</h2>
  
  <h2>  {chartData[0]?.present} days </h2>
  </Button>

 </div>
  
     <div style={{width:"45%",height:"135px"}} >
    
     <Button   type='primary'  danger  style={{width:"100%",
     opacity:0.4,
     height:"100%"}} >
     <h2 style={{textAlign:"center",fontStyle:"italic"}}>Total Absent</h2>
    <h2>    { chartData[0]?.absent } days </h2>
       
       </Button>

     </div>
   
 
      </div>
      {/* <Table dataSource={dataSource} columns={columns} /> */}
    </div>

  )

}

export default DashBoard












