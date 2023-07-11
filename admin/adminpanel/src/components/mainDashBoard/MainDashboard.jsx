import React from "react";
import mainDashBoardStyle from "./mainDashBoard.module.css";
import { useState } from "react";
import { Button } from "antd";
import moment from "moment";
import { useEffect } from "react";
import axios from "axios";
import imglogo from "../../assets/student.png";
import { MdPersonAddAlt1 } from "react-icons/md";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { RiEnglishInput } from "react-icons/ri";
import { TbMathFunctionOff } from "react-icons/tb";
import { GiMaterialsScience } from "react-icons/gi";
import { FiTrello } from "react-icons/fi";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  BsPersonFillAdd,
  BsFillPersonVcardFill,
  BsPersonGear,
  BsPersonWorkspace,
} from "react-icons/bs";
import { FaSearchengin, FaPlaystation } from "react-icons/fa";
import { MdOutlinePersonAddAlt } from "react-icons/md";

const MainDashBoard = () => {
  const [student, setStudent] = useState([]);
  const [instuctor, setInstructor] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [dashboardBanner, setdasboardBanner] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    axios
      .get(`https://dearmschool.com/api/student`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        throw err;
      });

    axios
      .get(`https://dearmschool.com/api/instractor`)
      .then((res) => {
        setInstructor(res.data);
      })
      .catch((err) => {
        throw err;
      });

    axios
      .get(`https://dearmschool.com/api/getadmin`)
      .then((res) => {
        setAdmin(res.data.admin);
      })
      .catch((err) => {
        throw err;
      });
  };

  console.log(admin);

  useEffect(() => {
    getData();
  }, []);

  const getAdBanner = () => {
    setLoading(true);
    axios
      .get(`https://dearmschool.com/api/dashboardbanner/all`)
      .then((res) => {
        setdasboardBanner(res.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getAdBanner();
  }, []);

  const upboard = student.filter((item) => {
    const data = item.boardName === "UP BOARD";
    return data;
  });

  const Mhboard = student.filter((item) => {
    const data = item.boardName === "MH BOARD";
    return data;
  });

  const jhboard = student.filter((item) => {
    const data = item.boardName === "JH BOARD";
    return data;
  });

  const Mpboard = student.filter((item) => {
    const data = item.boardName === "MP BOARD";
    return data;
  });

  const other = student.filter((item) => {
    const data = item.boardName === "Other";
    return data;
  });

  const mathInstructor = instuctor.filter((item) => {
    const math = item.subject === "math";
    return math;
  });

  const enlishInstructor = instuctor.filter((item) => {
    const english = item.subject === "english";
    return english;
  });

  const hindiInstructor = instuctor.filter((item) => {
    const hindi = item.subject === "hindi";
    return hindi;
  });

  const scienceInstructor = instuctor.filter((item) => {
    const science = item.subject === "science";
    return science;
  });

  const rootAdminCount = admin.filter((item) => {
    const rootAdmin = item.adminType === "root";
    return rootAdmin;
  });

  const subAdminCount = admin.filter((item) => {
    const subAdmin = item.adminType === "sub";
    return subAdmin;
  });

  const subAdminState = [...new Set(admin.map((item) => item.state))]; // [ 'A', 'B']

  return (
    <div className={mainDashBoardStyle.mainDashDiv}>
      <div>
        <div className={mainDashBoardStyle.headingdiv}>
          <span>Dash board</span>

          <Button type="primary" style={{ fontStyle: "italic" }}>
            {moment(new Date()).format("DD-MMMM-YYYY")} Today date
          </Button>
        </div>
      </div>

      <div>
        <div style={{ marginBottom: "14px" }}>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={true}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {dashboardBanner.map((item) => (
              <SwiperSlide
                style={{
                  height: "200px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  lineHeight: "23px",
                  textAlign: "center",

                  flexDirection: "column",
                }}
              >
                <img
                  src={item.dashboardBanner}
                  alt=""
                  style={{ height: "100%", width: "100%", borderRadius: "3px" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={mainDashBoardStyle.adminInfoSection}>
        <div>
          <p>Totol Student</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <FaUserGraduate size={27} />
            {student.length}
          </section>
        </div>

        <div>
          <p>UP Board</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <FaUserGraduate size={27} />

            {upboard.length}
          </section>
        </div>

        <div>
          <p>JH Board</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <FaUserGraduate size={27} />

            {jhboard.length}
          </section>
        </div>

        <div>
          <p>MH Board</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <FaUserGraduate size={27} />

            {Mhboard.length}
          </section>
        </div>

        <div>
          <p>MP Board</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <FaUserGraduate size={27} />

            {Mpboard.length}
          </section>
        </div>

        <div>
          <p>Other</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <FaUserGraduate size={27} />

            {other.length}
          </section>
        </div>
      </div>

      {/* ============================================================================================= */}
      <div className={mainDashBoardStyle.admindashDiv}>
        <div className={mainDashBoardStyle.instructorDashInfo}>
          <p>Instructor</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <FaChalkboardTeacher size={30} />

            {instuctor.length}
          </section>
        </div>

        <div className={mainDashBoardStyle.instructorDashInfo}>
          <p>Math</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <TbMathFunctionOff size={30} />

            {mathInstructor.length}
          </section>
        </div>

        <div className={mainDashBoardStyle.instructorDashInfo}>
          <p>English</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <RiEnglishInput size={30} />

            {enlishInstructor.length}
          </section>
        </div>

        <div className={mainDashBoardStyle.instructorDashInfo}>
          <p>Science</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <GiMaterialsScience size={30} />

            {scienceInstructor.length}
          </section>
        </div>

        <div className={mainDashBoardStyle.instructorDashInfo}>
          <p>Hindi</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <FiTrello size={30} />
            {hindiInstructor.length}
          </section>
        </div>
      </div>

      {/* ====================================================================================== */}
      <div className={mainDashBoardStyle.admindashDiv}>
        <div className={mainDashBoardStyle.admindashInfo}>
          <p>Total Admin </p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <BsFillPersonVcardFill color="lightgreen" size={35} />
            <p>{admin.length}</p>
          </section>
        </div>

        <div className={mainDashBoardStyle.admindashInfo}>
          <p>Root Admin</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <BsPersonGear color="lightgreen" size={33} />
            <p>{rootAdminCount.length}</p>
          </section>
        </div>

        <div className={mainDashBoardStyle.admindashInfo}>
          <p>Sub Admin</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <MdOutlinePersonAddAlt color="lightgreen" size={35} />
            <p>{subAdminCount.length}</p>
          </section>
        </div>

        <div className={mainDashBoardStyle.admindashInfo}>
          <p>Total State</p>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <FaPlaystation color="lightgreen" size={35} />
            <p>{subAdminState.length}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MainDashBoard;
