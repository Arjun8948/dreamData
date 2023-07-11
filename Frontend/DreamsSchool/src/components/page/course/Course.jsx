import React, { useEffect, useState } from 'react'
import courseStyle from "../../css/course/CoursePage.module.css"
import Navber from '../navber/Navber'
import CourseCart from '../course/CourseCart'
import Footer from '../footer/Footer'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Img from "../../../assets/girl.png";
import courseCardStyle from "../../css/course/Coursecard.module.css"
import { Avatar, Button, Card, Rate ,Spin} from "antd"
import girlImg from "../../../assets/educationgirl.png"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Select, Input } from 'antd';

const { Search } = Input;
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { notification } from "antd"
import { studentupdate } from '../../../redux/studentSlice'
import {format} from "timeago.js"
import moment from "moment"
import imgOne from "../../../assets/slider/1.png"
import twoOne from "../../../assets/slider/2.png"
import threeOne from "../../../assets/slider/3.png"
import fourOne from "../../../assets/slider/4.png"
import fiveOne from "../../../assets/slider/5.png"
import sixOne from "../../../assets/slider/6.png"
import sevenOne from "../../../assets/slider/7.png"
 


const mobileSlider = [imgOne,twoOne,threeOne,fiveOne,fourOne,sevenOne,sixOne]

const Course = () => {

  const { currentStudent } = useSelector((state) => state.student)
  const [bannerImage, setBannerImg] = useState([]);
  const [classData, setClassData] = useState([])
  const [searchParams] = useSearchParams();
  const searchData = searchParams.get('type');
  const [messageApi, inputErrorMassage] = notification.useNotification();
  const Navigate = useNavigate()
   const dispatch = useDispatch()

   const [windowSize, setWindowSize] = useState('')
   useEffect(() => {
    setInterval(() => {
        setWindowSize(window.innerWidth)
    }, 0)

}, [windowSize])


useEffect


  useEffect(() => {
    axios.get("https://dearmschool.com/api/getbanner/all").then((res) => {
      setBannerImg(res.data);
    }).catch((err) => {
      throw err

    })

    axios.get(`https://dearmschool.com/api/getclass?boardName=${searchData || ""}`).then((res) => {
      setClassData(res.data);
      console.log(res.data);
    }).catch((err) => {
      throw err

    })
    console.log(classData);
  }, [])

  const courseJoinHandler = (id, enrollId, boardName, className, Subject, Price) => {

    if (currentStudent === null) {
      messageApi.error({
        message: `Something wrong`,
        description: `Please loging your acccount`,
        placement: 'top',

      })
      return false;
    }
    else if (currentStudent.enrollId) {
      messageApi.error({
        message: `Something wrong`,
        description: `You alerady joined !`,
        placement: 'top',

      })
      return false;
    }
    else {

      axios.put(`https://dearmschool.com/api/student/update`, { id, enrollId, boardName, className, Subject, Price }).then((res) => {
        dispatch(studentupdate(res.data))
        console.log(res.data);
      }).catch((err) => {
        throw err

      })
    }
  }

  return (

    <div className={courseStyle.courseSection}>
       {inputErrorMassage}
      <div className={courseStyle.nav} >
        <Navber />
      </div>
     
      <>
    {  
  (bannerImage=="")? <div style={{height:"100vh",width:"100%",display:"flex",
             justifyContent:"center",alignItems:"center"}}> <Spin  size="large" value={"loading"}/></div>  :
     <>
      <div className={courseStyle.courseContaner} >
        <div className={courseStyle.sliderDivContaner}>
   
          <Swiper className={courseStyle.sliderDiv}
            modules={[Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={1}
            autoplay={true}>
    
            
            {(windowSize>500)?
              bannerImage.map((item) => (
 
                <SwiperSlide   style={{
                  height: "auto",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  border: "1px solid lightgray",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  lineHeight: "23px",
                  flexDirection: "column",
                }}> 
                  <img src={item?.imgUrl} height={'100%'} width={'100%'} />
                  
                   </SwiperSlide >

              ))
:
  
          mobileSlider.map((item) => (
 
          <SwiperSlide   style={{
        height: "auto",
       textAlign: "center",
        backgroundColor: "#fff",
        borderRadius: "4px",
                 border: "1px solid lightgray",
               display: "flex",
            justifyContent: "center",
              alignItems: "center",
                lineHeight: "23px",
               flexDirection: "column",
           }}> 
                <img src={item} height={'100%'} width={'100%'} />
                
           </SwiperSlide >

             ))

        
          }
          </Swiper>

        </div>

      </div>
<div className={courseStyle.courseCartHeading}>
                  
    <marquee style={{  textTransform:"uppercase",wordSpacing:"5px"}} behavior="" direction="left"> 
    WELCOME TO THE DREAMS SCHOOL E-LEARMING PLATFORM, which provides wonderfull study for all board classes at a reasonable price,
     as well as the best study material and resources for all students. 
     </marquee>


</div>
      <div className={courseStyle.courseClassBox}>
        {
          classData.map((item) => (
            <div className={courseCardStyle.courseCard}>
              <img src={item.imageUrl} alt={''} className="course-image" />

              <div className={courseCardStyle.boardClassSection}>

                <div className={courseCardStyle.boardLogo}>
                  <Avatar src={item.boardUrl} size={40} />
                  <span className="boardName" style={{textTransform:"uppercase",fontSize:"14px"}}>{item.boardName} </span>
                </div>

              <div className={courseCardStyle.ClassSection}>
               
                  <span style={{textTransform:"uppercase",fontSize:"14px"}}>{item.className}</span>
                </div>
             </div>
              <br />
              <div className={courseCardStyle.priceInfo}>
                <span className={courseCardStyle.classText}> {item.subject}</span>
                <span className={courseCardStyle.price}>{item.price} &#8377; monthly</span>
              </div>


              <hr className={courseCardStyle.hrLine} />
              <div className={courseCardStyle.enrollSection}>
                <span>{(currentStudent?.enrollId?.includes(item._id)
                  && (currentStudent?.batch !== null)
                ) ? currentStudent.batch : item.status}</span>
                <span >{(currentStudent?.enrollId?.includes(item._id)
                  && (currentStudent?.start !== null)
                ) ? moment(currentStudent.start).format("DD-MMMM-YY") : moment(item.start).format("DD-MMMM-YY")}</span>

                {(currentStudent?.batchStatus?.includes('false')) ?
                  < button className={courseCardStyle.enrollbtn} type='primary' size='large' onClick={() => courseJoinHandler(
                    currentStudent?._id, item._id, item.boardName, item.className, item.subject, item.price
                  )} > {(currentStudent?.enrollId?.includes(item._id)) ? "joined" : "join now"}</button>
                  :
                  < button className={courseCardStyle.enrollbtn} type='primary' size='large'

                  > {(currentStudent?.enrollId?.includes(item._id) && (currentStudent?.batchStatus?.includes('true')) ? <span onClick={() => Navigate("/student")} style={{ fontWeight: '100px' }}> {'DASHBOARD'}</span> : <span onClick={() => courseJoinHandler(
                    currentStudent?._id, item._id, item.boardName, item.className, item.subject, item.price
                  )} style={{ fontWeight: '100px' }}> {'join now'}</span>)}</button>
                }
              </div>
            </div>

          ))
        }

      </div>
      <Footer />
      </>
    }
      </>
    </div>
  )
}



export default Course