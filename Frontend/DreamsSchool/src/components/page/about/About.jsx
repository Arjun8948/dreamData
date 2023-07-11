import React, { useEffect, useState } from "react";
import aboutStyle from "../../css/about/aboutPage.module.css";
import Navber from "../navber/Navber";
import Footer from "../footer/Footer";
import aboutBanner1 from "../../../assets/aboutbanner.png";
// import aboutBanner2 from "../../../assets/aboutbanner2.png";
import fouder from "../../../assets/fouder.png";
import one from "../../../assets/1.png";
import supporImg from "../../../assets/support.png";
import courseStyle from "../../css/course/CoursePage.module.css"

import axios from "axios";
import { Spin, notification } from "antd";
import imgOne from "../../../assets/slider/1.png"
import twoOne from "../../../assets/slider/2.png"
import threeOne from "../../../assets/slider/3.png"
import fourOne from "../../../assets/slider/4.png"
import fiveOne from "../../../assets/slider/5.png"
import sixOne from "../../../assets/slider/6.png"
import sevenOne from "../../../assets/slider/7.png"
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
 
const mobileSlider = [imgOne,twoOne,threeOne,fiveOne,fourOne,sevenOne,sixOne]

const About = () => {
  const [massage, MassageHolder] = notification.useNotification();
  const [windowSize, setWindowSize] = useState('')

  const [loading, setLoading] = useState(false);
  const [bannerImage, setBannerImg] = useState([]);
  const [suportData, setSupportData] = useState({
    name: "",
    email: "",
    massage: "",
  });


 
  const supportInput = (e) => {
    setSupportData({
      ...suportData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios.get("https://dearmschool.com/api/getbanner/all").then((res) => {
      setBannerImg(res.data);
    }).catch((err) => {
      throw err

    })

  },[])


  useEffect(() => {
    setInterval(() => {
        setWindowSize(window.innerWidth)
    }, 0)

}, [windowSize])

  const supportHandler = () => {
    setLoading(true);
    axios
      .post("https://dearmschool.com/api/addContact", { ...suportData })
      .then((res) => {
        massage.success({
          message: "Contact Request Success",
          description: res.data.massage,
          placement: "top",
        });
        setLoading(false);
      })
      .catch((err) => {
        massage.error({
          message: "Contact Request Field",
          description: err.response.data.massage || "Internal Server Eroor",
          placement: "top",
        });
        setLoading(false);

        throw err;
      });
    setSupportData({
      name: "",
      email: "",
      massage: "",
    });
  };
  return (
 
    <div className={aboutStyle.aboutSection}>
      {MassageHolder}
      <div className={aboutStyle.nav}>
        <Navber />
      </div>
      <>
    {  
  (bannerImage=="")? <div style={{height:"100vh",width:"100%",display:"flex",
             justifyContent:"center",alignItems:"center"}}> <Spin  size="large" value={"loading"}/></div>  :
     <>
     <div className={aboutStyle.aboutContaner}>
        {/* ============================================ */}
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

        <div className={aboutStyle.aboutheader}>
          <div>
            <p>
              {" "}
              Dreams School offers a super online learning and research
              environment, as well as a transformation of education to deliver
              superior and unique learning resources at the lowest possible cost
              and with a wealth of study features for students.{" "}
            </p>
          </div>
        </div>

        <div>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "22px",
              padding: "10px 0px",
              color: "#fff",
              backgroundColor: "#FF6575",
              fontWeight: "550",
              margin: "2px 0px",
              marginBottom:"10px",
              textTransform: "capitalize",
            }}
          >
            <p> About The Dreams School </p>
          </div>
          <div className={aboutStyle.aboutFounder}>
            <div className={aboutStyle.aboutFounderImg}>
              <img src={fouder} alt="" />
            </div>
            <div className={aboutStyle.aboutFounderText}>
              <h2>A brief history</h2>
              <p>
                An ed-tech platform called<b> Dreams School</b> ,founded in 2023
                by<b> Arvind Varma </b> and <b> Pawan Kumar </b> is creating a
                futuristic online education to offer millions of students a
                highly immersive and interactive learning path and give them
                access to cutting-edge tech opportunities.
              </p>
              <p>
                The best online learning environment for all of you is Dreams
                School. It provides the most challenging skill training and
                board class for diffrent state at a reasonable cost with fully
                supported live instruction and mentoring sessions, preparing you
                for the board examination government jobs.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        <div>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "20px",
              padding: "10px 0px",
              color: "#fff",
              backgroundColor: "#FF6575",
              textTransform: "capitalize",
              fontWeight: "550",
              margin: "2px 0px",
            }}
          >
            <p>Why is Online better then offline</p>
          </div>
          <div className={aboutStyle.aboutProblemSalution}>
            <div className={aboutStyle.problem}>
              <div className={aboutStyle.problemHeading}>
                <p>Offine learning </p>
              </div>

              <p>
                As previously stated, everything has a downside. As a result,
                offline education classes come with their own set of drawbacks.
                Let's see.
                <br />
                <b>No flexibility</b> - Because there is a strict schedule, the
                kids struggle to adhere to it. When it comes to learning, they
                prefer greater flexibility.
                <br />
                <b>Expensive </b>– Offline classes are more expensive than
                online classes. With so much money spent on transit, clothing,
                classroom activities, stationery and other extracurricular
                expenses, parents find it difficult to create a budget.
                <br />
                <b>Dependence </b>- Students grow overly reliant on their
                teachers for everything. As a result, they do not learn
                self-discipline.
              </p>
            </div>
            <div className={aboutStyle.salution}>
              <div className={aboutStyle.problemHeading}>
                <p>Online learning </p>
              </div>
              <p>
                Online learning allows teachers to provide lessons to students
                more efficiently. Teachers can use online learning tools such as
                videos, PDFs, and podcasts into their lesson preparations.
                Teachers can become more efficient instructors by expanding the
                lesson plan beyond standard textbooks and including online
                resources. Online education is considerably less expensive than
                traditional education. This is due to the fact that online
                learning reduces the costs of student transportation, student
                meals, and, most crucially, student housing. Furthermore, all
                course or study materials are available online, resulting in a
                paperless learning environment that is less expensive and better
                for the environment.
              </p>
            </div>
          </div>
        </div>
        {/* =========================================================== */}
        <div style={{ height: "100%", width: "100%" }}>
          <div
            className={aboutStyle.headingLine}
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "22px",
              padding: "10px 0px",
              color: "#fff",
              backgroundColor: "#FF6575",
              fontWeight: "550",
              margin: "2px 0px",
              textTransform: "capitalize",
            }}
          >
            <p> Dreams School Support </p>
          </div>
          <div className={aboutStyle.support}>
            <div className={aboutStyle.supportImg}>
              <img src={supporImg} alt="" />
            </div>
            <div className={aboutStyle.supportform}>
              <div className={aboutStyle.formhelp}>
                <div className={aboutStyle.formHeading}>Contact Us</div>
                <div className={aboutStyle.helpName}>
                  <div>
                    <label htmlFor="">
                      Name <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      value={suportData.name}
                      onChange={supportInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="">
                      Email <sup>*</sup>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={suportData.email}
                      onChange={supportInput}
                      required
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="" style={{ fontSize: "14px" }}>
                    Message <sup>*</sup>
                  </label>
                  <textarea
                    cols="20"
                    rows="5"
                    style={{
                      padding: "10px",
                      border: "0.3px solid lightgray",
                      outline: "none",
                      borderRadius: "8px",
                    }}
                    placeholder="Enter massage"
                    name="massage"
                    value={suportData.massage}
                    onChange={supportInput}
                  ></textarea>
                </div>
                <div className={aboutStyle.helpformbtn}>
                  <button onClick={supportHandler}>
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
    }
      </>
    </div>
 
  );
};

export default About;
