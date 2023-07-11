import { useEffect, useState } from "react";
import appStyle from "./App.module.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/page/navber/Navber";
import Login from "./components/page/login/Login";
import Home from "./components/page/home/Home";
import About from "./components/page/about/About";
// import Blog from "./components/page/blog/Blog";
import { Signin } from "./components/page/login/Signin";
import Course from "./components/page/course/Course";
import Schoolai from "./chat/Schoolai";
// import ShowPost from "./components/page/blog/ShowPost";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import Eroor from "./components/page/error/Eroor";
import AddClass from "./components/Instructor/class/AddClass";
import NotesPage from "./components/Instructor/notes/NotesPage";
import Video from "./components/Instructor/video/Video";
import BatchStudent from "./components/Instructor/student/BatchStudent";
import Instractor from "./components/Instructor/dashboard/Instractor";
import axios from "axios";
import Student from "./components/student/student/Student";

function App() {
  const { currentStudent } = useSelector((state) => state.student);
  const { currentInstructor } = useSelector((state) => state.instrutor);

  const Nevigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("instractordsts");
    const student = localStorage.getItem("studentdsts");
    if (student) {
      axios
        .get(`https://dearmschool.com/api/student?id=${currentStudent?._id}`)
        .then((item) => {
          if (
            item.data[0].batchStatus === "true" &&
            item.data[0].batch !== null
          ) {
            Nevigate("/student");
          }
        })
        .catch((err) => {
          console.log(err?.response?.data?.massage || "something error");
        });
    }

    if (token) {
      axios
        .get(
          `https://dearmschool.com/api/instractor?id=${currentInstructor?._id}`
        )
        .then((item) => {
          if (item.data[0].subscription === "true") {
            Nevigate("/Instractor");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="course" element={<Course />} />
          <Route path="about" element={<About />} />
          {/* <Route path="blog" element={<Blog />} /> */}
          {/* <Route path="blog/:id" element={<ShowPost />} /> */}
          <Route path="signup" element={<Login />} />
          <Route path="login" element={<Signin />} />
        </Route>
        {currentStudent !== null &&
          currentStudent.enroll === "true" &&
          currentStudent.batchStatus === "true" && (
            <Route path="/student/">
              <Route index element={<Student/>} />
            </Route>
          )}

        <Route path="/Instractor">
          <Route index element={<Instractor />} />
        </Route>

        <Route path="/mentor">
          <Route index element={<Home />} />
        </Route>

        <Route path="/staff">
          <Route index element={<Home />} />
        </Route>

        <Route path="*" element={<Eroor />} />
      </Routes>
    </>
  );
}

export default App;
