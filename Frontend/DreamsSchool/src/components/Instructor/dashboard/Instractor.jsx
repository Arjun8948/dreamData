import React, { useEffect, useState } from 'react'
import { Button,message, Calendar, Popconfirm ,Menu } from "antd"
import dashboardStyle from "./Dashboard.module.css"
import { RxDashboard } from 'react-icons/rx';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdVideoCall } from 'react-icons/md';
import { GiRamProfile } from 'react-icons/gi';
import { BiBookContent } from 'react-icons/bi';
import { MdAssignmentAdd } from 'react-icons/md';
import { BsPersonVideo } from 'react-icons/bs';
import { GiNotebook } from 'react-icons/gi';
import { FiEdit } from 'react-icons/fi';
import { BsPatchCheckFill } from 'react-icons/bs';
import { Avatar, Input } from "antd"
const { Search } = Input;
import DashBoard from './DashBoard';
import AddClass from '../class/AddClass';
import logo from "../../../assets/logo.png"
import Assignment from '../assignment/Assignment';
import Setting from '../Setting/Setting';
import Books from '../book/Books';
import Video from '../video/Video';
import NotesPage from '../notes/NotesPage';
import liveLogo from '../../../assets/class.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import moment from 'moment';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { instructorLogout } from '../../../redux/instructorSlice';
import axios from "axios"
import Test from '../test/Test';

const Instractor = () => {
  const disptch = useDispatch()
  const [route, setRoute] = useState('dashboard')
  const { currentInstructor } = useSelector((state) => state.instrutor)
  const nevigate = useNavigate()
  const [bannerImg,setBannerImg]= useState([]);

  const onSearch = (value) => console.log(value);
 
 useEffect(()=>{
// dashboard banner image
  axios.get('https://dreamsachool-y2s8.onrender.com/api/dashboardbanner/all')
  .then((res)=>setBannerImg(res.data)).catch((err)=>{throw err})
  // class Link
},[])

 
  return (
    <div className={dashboardStyle.contenar} >
      <div className={dashboardStyle.sidenav}>
        <div className={dashboardStyle.logo} >
          <div>
          <img src={logo} alt="" />
          </div>
        </div>
        <Menu
          defaultSelectedKeys={['dashboard']}

          mode="inline"
          theme="dark"

          items={[
            { label: <p onClick={() => setRoute('dashboard')} >Dashboard</p>, key: "dashboard", icon: <  RxDashboard size={'17'} /> },
            { label: <p onClick={() => setRoute('class')} >Class</p>, key: "Class", icon: <  BsPersonVideo size={'20'} /> },
            { label: <p onClick={() => setRoute('book')} >Books</p>, key: "book", icon: <  BiBookContent size={'20'} /> },
            { label: <p onClick={() => setRoute('video')} >Vedio</p>, key: "video", icon: <  MdVideoCall size={'25'} /> },
            { label: <p onClick={() => setRoute('notes')} >Notes</p>, key: "notes", icon: < GiNotebook size={'20'} /> },
            { label: <p onClick={() => setRoute('assignment')} >Assignment</p>, key: "assignment", icon: < MdAssignmentAdd size={'20'} /> },
            { label: <p onClick={() => setRoute('test')} >Test</p>, key: "test", icon: < MdAssignmentAdd size={'20'} /> },
           { label: <p onClick={() => setRoute('profile')} >Profile</p>, key: "profile", icon: < GiRamProfile size={'19'} /> },
            {
              label: <p onClick={() => {
             
               const con =confirm("DO YOU WANT LOGOUT")
        
              if(con){
                disptch(instructorLogout()),
                nevigate("/")
              }
               
              }} >Logout</p>, key: "logout", icon: <  HiOutlineLogout size={'23'} />
            },


          ]}
        />


      </div>
      <div className={dashboardStyle.main} >
        <div className={dashboardStyle.mainHeader} >
          <div  >
            <i > Hello {currentInstructor?.name}</i>
            <img width="23" height="28" src="https://img.icons8.com/emoji/48/nikita-clapping-hands-emoji.png" alt="nikita-clapping-hands-emoji" />
          </div>
          <div  className={dashboardStyle.searcbbox} >
            <input type="text" value={moment(new Date()).format("DD-MMMM-YYYY HH:MM A")} placeholder='Search...' />
            <button disabled>Today Date</button>
          </div>

        </div>
        <div >
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            autoplay={true}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
          
            {
               bannerImg.map((item) => (

                <SwiperSlide style={{ height: '175px', width: "100%", borderRadius: '10px' }}>
                  <img src={item.dashboardBanner} alt="" style={{ height: '100%', width: "100%", borderRadius: '4px' }} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>

        <div className={dashboardStyle.mainRoute}>
          {route === 'dashboard' && <DashBoard />}
          {route === 'class' && <AddClass />}
          {route === 'book' && <Books />}
          {route === 'video' && <Video />}
          {route === 'notes' && <NotesPage />}
          {route === 'assignment' && <Assignment />}
           {route === 'test' && <Test/>}
           {route === 'profile' && <Setting />}
          {route === 'addclass' && <AddClass />}
        </div>

      </div>
      <div className={dashboardStyle.profile}>
        <div className={dashboardStyle.profileNav}>
          <span>Profile</span>
          <span > <FiEdit size={'18'} onClick={() => setRoute('profile')} /></span>
        </div>
        <div className={dashboardStyle.profileItems}>
          <Avatar src={currentInstructor?.profileImg}
            size={80} style={{border:"2px dotted #FA4767",backgroundColor:"#fff"}} />
          <span>{currentInstructor?.name}<span> <BsPatchCheckFill color='#007AFF' size={'13'} /></span> </span>
          <span>{currentInstructor?.subject + " Instructor" }</span>

        </div>
        <div style={{ padding: '15px 5px' }} >
          <Calendar style={{ backgroundColor: "#321A41" }} fullscreen={false} />
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default Instractor








