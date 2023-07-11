import React, { useEffect } from 'react'
import adminDashboardStyle from "./Dashboard.module.css"

import { Button, Menu, Avatar, notification } from 'antd';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi'
import { FaUserGraduate, FaUserPlus,FaChalkboardTeacher } from 'react-icons/fa'
import { MdOutlineSupportAgent, MdOutlinePictureInPicture,MdOutlinePersonPin,MdDeveloperBoard ,MdFeaturedPlayList, MdOutlineReviews, MdHotelClass } from 'react-icons/md'
import { BsPersonWorkspace, BsPersonVcard ,BsCreditCard2Front,BsPersonVideo3} from 'react-icons/bs'
import { RxDashboard } from 'react-icons/rx'
import { SiGoogleclassroom } from 'react-icons/si'
import { TiImageOutline } from 'react-icons/ti'
import MainDashBoard from '../mainDashBoard/MainDashboard';
import Admin from '../admin/Admin';
import Instractor from '../instractor/Instractor';
import Mentor from '../mentor/Mentor';
import Stuff from '../stuff/Stuff';
import Enquiry from '../enquiry/Enquiry';
import Student from '../student/Student';
import Feature from '../UI/feature/Feature.jsx';
import Review from '../UI/review/Review';
import Banner from '../UI/banner/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/adminSlice';
import DashboardBanner from '../UI/dashboardBanner/DashboardBanner';
import AddBoard from '../addClass/board/AddBoard';
import AddBoardClass from '../addClass/class/AddBoardClass';
import Books from '../book/Books';
import { SiBookstack } from 'react-icons/si';
 import CreateBatch from "../student/CreateBatch"



const Dashboard = ({ setLogin }) => {
  const dispatch = useDispatch();
  const admin = useSelector((state) =>  state.currentAdmin)
  const [api, contextHolder] = notification.useNotification();

  const [route, setRoute] = useState("Dashboard")
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const logoutHandler = () => {
    dispatch(logout())
    sessionStorage.removeItem("admintoken")
   
    api.success({
      message: `Admin Success Logout`,
      description: "Your are successfully logout",
      placement: "top",

    })

    setTimeout(() => {
      const token = sessionStorage.getItem("admintoken")
   
      if (admin._id === null || token === null || token === "") {

        setLogin(false)
      } else {
        setLogin(true)

      }

    },500);

  }


  const items = [
    { label: <p onClick={() => setRoute("Dashboard")}>Dashboard</p>, key: 'Dashboard', icon: <RxDashboard size={18} /> }, // remember to pass the key prop
    { label: <p onClick={() => setRoute("Admin")}>  Admin </p>, key: 'Admin', icon: <BsPersonVcard size={21} /> },
    { label: <p onClick={() => setRoute("Instructor")}>  Instructor </p>, key: 'Instructor', icon: <FaChalkboardTeacher size={22} /> },
    { label: <p onClick={() => setRoute("Mentor")}>  Mentor </p>, key: 'Mentor', icon: <BsPersonWorkspace size={18} /> },
    { label: <p onClick={() => setRoute("Stuff")}>  Stuff </p>, key: 'Stuff', icon: <MdOutlinePersonPin size={22} /> },
    { label: <p>Course</p>  , icon: <SiGoogleclassroom size={18} /> ,children: [
      { label: <p onClick={() => setRoute("AddBoard")}> Board </p>, key: 'AddBoard', icon: <MdDeveloperBoard size={18} /> },
      { label: <p onClick={() => setRoute("BoardClass")}> Class </p>, key: 'BoardClass', icon: <BsPersonVideo3 size={18} /> },
      { label: <p onClick={() => setRoute("Books")}> Books </p>, key: 'Books', icon: <SiBookstack size={18} /> },
            
    ],
    
  },
     
    { label: <p onClick={() => setRoute("Enquiry")}>  Enquiry </p>, key: 'Enquiry', icon: <MdOutlineSupportAgent size={22} /> },
    { label: <p onClick={() => setRoute("Contect")}>  Contact </p>, key: 'Contect', icon: <MdOutlineSupportAgent size={22} /> },
    { label: <p onClick={() => setRoute("Subcription")}>  Subcription </p>, key: 'Subcription', icon: <MdOutlineSupportAgent size={22} /> },
   
    {
      label: 'Student', icon:<FaUserPlus size={20}/> ,children: [
        { label: <p onClick={() => setRoute("Students")}>  Student </p>, key: 'Students', icon: <FaUserGraduate size={18} /> },
        { label: <p onClick={() => setRoute("Batch")}>  Batch </p>, key: 'Batch', icon: <FaUserGraduate size={18} /> },

      ],
    },

    {
      label: 'UI UPDATE', key: '', icon:<BsCreditCard2Front size={20}/>,children: [
        { label: <p onClick={() => setRoute("Feature")}>  Feature </p>, key: 'Feature', icon: <MdFeaturedPlayList size={20} /> },
        { label: <p onClick={() => setRoute("Review")}>  Review </p>, key: 'Review', icon: <MdOutlineReviews size={20} /> },
        { label: <p onClick={() => setRoute("Classbanner")}>Banner </p>, key: 'Classbanner', icon: <TiImageOutline size={20} /> },
        { label: <p onClick={() => setRoute("Dashboardbanner")}> DashboardBanner </p>, key: 'Dashboardbanner', icon: <MdOutlinePictureInPicture size={20} /> },
        

      ],
    },

    { label: <p onClick={logoutHandler}>  Logout </p>, key: 'Logout', icon: <FiLogOut size={20} /> },

  ];



  return (
    <div className={adminDashboardStyle.adminContenars} >
      {contextHolder}
      <div className={adminDashboardStyle.adminSidenav}>
        <div className={adminDashboardStyle.adminSidenavLogo}>
          <div className={adminDashboardStyle.adminProfile}>
            <Avatar src={admin?.profileImg || "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fbusinessman-profile-cartoon_18591-58481.jpg%3Fw%3D2000&tbnid=CaceQzkQU7d8QM&vet=10CAIQxiAoAGoXChMIiNCg2a7H_wIVAAAAAB0AAAAAEAc..i&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fpersonal-avatar%2F22&docid=3MJDILURr3-EjM&w=2000&h=2000&itg=1&q=profile%20img&ved=0CAIQxiAoAGoXChMIiNCg2a7H_wIVAAAAAB0AAAAAEAc"} size={42} />
            <div >
              <p style={{ textAlign: "left", fontSize: "14px", fontStyle: "italic", textTransform: "capitalize" }} >{admin?.name || "Dreams School"}</p>

              <p style={{ textAlign: "left", fontSize: "12px", fontStyle: "italic" }} >{`<${admin?.adminType ||""} admin/>`}</p>
            </div>
          </div>

        </div>
        <div className={adminDashboardStyle.adminSidenavMenu}>
          <div style={{ height: "100vh", margin: "15px 0px" }}>
            <Menu items={items} height="100vh"
              defaultSelectedKeys={"Dashboard"}
              mode="inline"
              theme="dark"

              style={{
                padding: '0px 8px', margin: "15px 0px"

              }}
              inlineCollapsed={collapsed} />
          </div>
        </div>

      </div>
      {/* ========== */}
      <div className={adminDashboardStyle.adminMainConteinar}>
        {route === "Dashboard" && <MainDashBoard />}
        {route === "Admin" && <Admin />}
        {route === "Instructor" && <Instractor />}
        {route === "Mentor" && <Mentor />}
        {route === "Stuff" && <Stuff />}
        {route === "Students" && <Student />}
        {/* {route === "AddClass" && <Addclass />} */}
        {route === "Enquiry" && <Enquiry />}
        {route === "Feature" && <Feature />}
        {route === "Review" && <Review />}
        {route === "Classbanner" && <Banner />}
        {route === "Dashboardbanner" && <DashboardBanner/>}
        {route === "AddBoard" && <AddBoard/>}
        {route === "BoardClass" && <AddBoardClass/>}
        {route === "Books" && <Books/>}
        {route === "Batch" && <CreateBatch/>}



      </div>

    </div>
  )
}

export default Dashboard



