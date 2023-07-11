import React, { useState } from "react";
import loginImg from "../../../assets/login url.png";
import loginStyle from "../../css/login/Login.module.css";
import logo from "../../../assets/logo.png";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate } from "react-router-dom";
import {
  ClickStyle,
  StudentClickStyle,
  StudentnoneClickBtn,
  noneClickBtn,
} from "../OptionBtn";
import { Select } from "antd";
import { sentOtp, verifyOtp } from "../firebase/PhoneAuth";
import ReactLoading from "react-loading";
import { notification } from "antd";
import axios from "axios";

const Login = () => {
  const [OTP, setOTP] = useState("");
  const [loginType, setLoginType] = useState("Student");
  const [verifyToggle, setVerifyToggle] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoging] = useState(false);
  const [phoneverifytoken, setPhoneVerifyToken] = useState(null);
  const [showNumberInput, setShowNumberInput] = useState(true);
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    className: "",
    boardName: "",
    password: "",
    confirmPassword: "",
  });

  const [messageApi, inputErrorMassage] = notification.useNotification();
  const Nevigate = useNavigate();

  const inputHandler = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const studentSignupHandler = () => {
    const nameRegex = new RegExp("^[a-zA-Z]+$");
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );
    const numberRegex = new RegExp("[^0-9]");

    if (studentData.firstName === "") {
      messageApi.error({
        message: `Name Field Error`,
        description: "Please Enter First Name",
        placement: "top",
      });
      return false;
    } 
     if (studentData.firstName.length < 3) {
      messageApi.error({
        message: `Name Field Error`,
        description: "Enter First Name More Than 3 Charecter.",
        placement: "top",
      });
      return false;
    } 
     if (!studentData.firstName.match(nameRegex)) {
      messageApi.error({
        message: `Name Field Error`,
        description: "Enter First Name Only Charecter.",
        placement: "top",
      });
      return false;
    }

    if (studentData.lastName === "") {
      messageApi.error({
        message: `Name Field error`,
        description: "Please Enter Last Name",
        placement: "top",
      });
      return false;
    } 
     if (studentData.lastName.length < 3) {
      messageApi.error({
        message: `Name Field Error`,
        description: "Enter Last Name More Than 3 Charecter.",
        placement: "top",
      });
      return false;
    } 
     if (!studentData.lastName.match(nameRegex)) {
      messageApi.error({
        message: `Name Field Error`,
        description: "Enter Last Name Only Charecter.",
        placement: "top",
      });
      return false;
    }  if (studentData.email === "") {
      messageApi.error({
        message: `Email Field Error`,
        description: "Please Enter Email Address",
        placement: "top",
      });
      return false;
    } 
     if (studentData.email.search(emailRegex)) {
      messageApi.error({
        message: `Email Field Error`,
        description: "Please Enter Valid Email Address",
        placement: "top",
      });
      return false;
    }  if (phone === "") {
      messageApi.error({
        message: `Number Field Error`,
        description: "Please Enter Phone Number",
        placement: "top",
      });
    }  if (phone.length === "") {
      messageApi.error({
        message: `Number Field Error`,
        description: "Please Enter Phone Number",
        placement: "top",
      });
    } 
     if (phone.length < 13) {
      messageApi.error({
        message: `Number Field Error`,
        description: "Please Enter 10 Phone Number",
        placement: "top",
      });
    } 
     if (phoneverifytoken === null) {
      messageApi.error({
        message: `Number Field Error`,
        description: "Please Verify Your Phone Number",
        placement: "top",
      });
      return false;
    } 
     if (studentData.className === "" || studentData.className === null) {
      messageApi.error({
        message: `Class Field Error`,
        description: "Please Select Your Class",
        placement: "top",
      });
      return false;
    } 
     if (studentData.boardName === "" || studentData.boardName === null) {
      messageApi.error({
        message: `Board Field Error`,
        description: "Please Select Your Board",
        placement: "top",
      });
      return false;
    } 
     if (studentData.password === "" || studentData.password === null) {
      messageApi.error({
        message: `Password Field Error`,
        description: "Please Enter Your Password",
        placement: "top",
      });
      return false;
    } 
     if (
      studentData.password.length < 8 ||
      studentData.password.length > 8
    ) {
      messageApi.error({
        message: `Password Field Error`,
        description: "Please Enter 8 Digit Password",
        placement: "top",
      });
      return false;
    } 
     if (
      studentData.confirmPassword === "" ||
      studentData.confirmPassword === null
    ) {
      messageApi.error({
        message: `Confirm Password Field Error`,
        description: "Please Enter Confirm Password",
        placement: "top",
      });
      return false;
    }
      if (studentData.confirmPassword !== studentData.password) {
      messageApi.error({
        message: `Confirm Password Field Error`,
        description: "Confirm Password does't match",
        placement: "top",
      });
      return false;
    }  
      if (phone === "" || phoneverifytoken === null) {
        messageApi.error({
          message: `Number Field Error`,
          description: "Please Verify Your Phone Number",
          placement: "top",
        });
        return false;
      } 
      
      setLoging(true);
        axios.post("https://dearmschool.com/api/student/signup", { ...studentData, phone,}).then((res) => {
        
                messageApi.success({
                  message: `Student Registration`,
                  description: `${res.data.massage}`,
                  placement: "top",
                })
                setLoging(false);
            
                return false;
          })
          .catch((err) => {

            messageApi.error({
              message: `Registration Failed`,
              description: `${
                err?.response?.data?.massage || "Please try again !"
              }`,
              placement: "top",
            });
          setLoging(false);
         return false;
          });

          setTimeout(() => {
            Nevigate("/login")
          }, 4000);
       
          setStudentData({
            firstName: "",
            lastName: "",
            email: "",
            className: "",
            boardName: "",
            password: "",
            confirmPassword: "",
          });
    
      }
 

  const numberVerification = (massage) => {
    messageApi.success({
      message: `Number verification`,
      description: `${massage}`,
      placement: "top",
    });
  };

  const numberVerificationFiled = (massage) => {
    messageApi.error({
      message: `Number verification Filed`,
      description: `${massage}`,
      placement: "top",
    });

    setStudentData({
      firstName: "",
      lastName: "",
      email: "",
      className: "",
      boardName: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className={loginStyle.contanar}>
      {inputErrorMassage}

      <div className={loginStyle.section1}>
        <div className={loginStyle.login}>
          <img src={loginImg} alt="error" />
        </div>
        <div className={loginStyle.text}>
          <h2>Welcome to Dreams School.</h2>
          <p>India's Best E-learning Pletform of Student </p>
        </div>
      </div>
      <div className={loginStyle.section2}>
        <div className={loginStyle.form}>
          <div className={loginStyle.logoback}>
            <div className={loginStyle.logo}>
              <img src={logo} alt="err" />
            </div>

            <p onClick={() => Nevigate("/")}>Back to Home</p>
          </div>
        </div>

        <div className={loginStyle.Signupform}>
          <div className={loginStyle.Heading}>
            <span style={{ fontSize: "22px" }}>Signup</span>
          </div>

          <div className={loginStyle.signupOption}>
            <span></span>
            <button
              className={loginStyle.student}
              style={
                loginType === "Student"
                  ? StudentClickStyle
                  : StudentnoneClickBtn
              }
              onClick={() => setLoginType("Student")}
            >
              {" "}
              Student
            </button>
          </div>

          <div className={loginStyle.signupNow}>
            <div className={loginStyle.forms}>
              <div className={loginStyle.name}>
                <div className={loginStyle.firstName}>
                  <label htmlFor="first name">
                    First Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="off"
                    placeholder="First name"
                    value={studentData.firstName}
                    onChange={inputHandler}
                  />
                </div>

                <div className={loginStyle.lastName}>
                  <label htmlFor="last name">
                    Last Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={studentData.lastName}
                    onChange={inputHandler}
                    autoComplete="off"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className={loginStyle.email}>
                <label htmlFor="email">
                  Email<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email address"
                  value={studentData.email}
                  autoComplete="off"
                  onChange={inputHandler}
                />
              </div>
              {showNumberInput && (
                <div className={loginStyle.phone}>
                  {!verifyToggle ? (
                    <>
                      <label htmlFor="number">
                        Phone<sup>*</sup>
                      </label>

                      <div className={loginStyle.inputOtp}>
                        <PhoneInput
                          placeholder="Enter phone number"
                          value={phone}
                          defaultCountry="IN"
                          autoComplete="off"
                          onChange={setPhone}
                        />

                        <button
                          onClick={() =>
                            sentOtp(phone, setVerifyToggle, setPhone)
                          }
                        >
                          Send OTP
                        </button>
                      </div>
                      {<div id="recaptcha-container"></div>}
                    </>
                  ) : null}
                  {verifyToggle && (
                    <div className={loginStyle.verify}>
                      <span>Enter 6 Digit OTP </span>
                      <OTPInput
                        value={OTP}
                        onChange={setOTP}
                        className="optbox"
                        autoFocus
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        number
                      />

                      <button
                        onClick={() =>
                          verifyOtp(
                            OTP,
                            setVerifyToggle,
                            setShowNumberInput,
                            setPhone,
                            setPhoneVerifyToken,
                            numberVerification,
                            numberVerificationFiled
                          )
                        }
                      >
                        Verify
                      </button>
                      <button
                        className={loginStyle.enter}
                        onClick={() => setVerifyToggle(false)}
                      >
                        Re-enter number
                      </button>
                    </div>
                  )}
                </div>
              )}
              <div className={loginStyle.option}>
                <div className={loginStyle.class}>
                  <label htmlFor="">
                    {" "}
                    Class<sup>*</sup>
                  </label>

                  <select
                    name="className"
                    value={studentData.className}
                    onChange={inputHandler}
                  >
                    <option>Select Class</option>
                    <option value="class 9">class 9</option>
                    <option value="class 10">class 10</option>
                    <option value="class 11">class 11</option>
                    <option value="class 12">class 12</option>
                  </select>
                </div>

                <div className={loginStyle.board}>
                  <label htmlFor="">
              
                    Board<sup>*</sup>
                  </label>
                  <select
                    name="boardName"
                    value={studentData.boardName}
                    onChange={inputHandler}
                  >
                    <option>Select board</option>
                    <option value="UP BOARD">UP BOARD</option>
                    <option value="MH BOARD">MH BOARD</option>
                    <option value="MP BOARD">MP BOARD</option>
                    <option value="JH BOARD">Jharkhand BOARD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className={loginStyle.password}>
                <label htmlFor="password">
                  Password<sup>*</sup>{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={studentData.password}
                  autoComplete="off"
                  onChange={inputHandler}
                />
              </div>

              <div className={loginStyle.confrim}>
                <label htmlFor="password">
                  Password Confirmation<sup>*</sup>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="off"
                  placeholder="Confirm password"
                  value={studentData.confirmPassword}
                  onChange={inputHandler}
                />
              </div>

              <div className={loginStyle.signupBtn}>
                <button type="submit" onClick={studentSignupHandler}>
                  {loading && (
                    <span>
                      {" "}
                      <ReactLoading
                        type="spokes"
                        color="white"
                        height="25px"
                        width="25px"
                      />
                    </span>
                  )}
                  Register now
                </button>
              </div>
            </div>
            <div className={loginStyle.alerdy}>
              <p>
                Already have an account?{" "}
                <span onClick={() => Nevigate("/login")}>Login</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
