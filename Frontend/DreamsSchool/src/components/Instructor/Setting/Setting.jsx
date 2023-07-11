import React, { useEffect, useState } from "react";
import seetingStyle from "./setting.module.css";
import { Alert, Button, notification } from "antd";
import updateProfile from "../../../assets/profileupdate.avif";
import { useDispatch, useSelector } from "react-redux";
import { instructorUpdateSucess } from "../../../redux/instructorSlice";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
const Setting = () => {
  const { currentInstructor } = useSelector((state) => state.instrutor);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState("profile");
  const [resetFile, setResetfile] = useState("file");
  const [reset, setReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetpassword, setResetPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");
  const [emailSucessMasssage, setEmailSucessMasssage] = useState("");
  const [messageApi, inputErrorMassage] = notification.useNotification();
  const [loding, setLoading] = useState(false);
  const [name, setName] = useState(currentInstructor.name);
  const [email, setEmail] = useState(currentInstructor.email);
  const [phone, setPhone] = useState(currentInstructor.phone);
  const [avater, setAvater] = useState(null);
  const [passwordId, setPasswordId] = useState("");
  const refresh = useNavigate();

  const updateInstrutorHandler = (e) => {
    if (
      (name === null || email === null || phone === null) &&
      (name === "" || email === "" || phone === "")
    ) {
      messageApi.error({
        message: `Updated Field Error`,
        description: `All field is required`,
        placement: "top",
      });
      return false;
    }
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", currentInstructor._id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("profileImg", avater);
    console.log(avater);

    axios
      .put("https://dreamsachool-y2s8.onrender.com/api/instractor/update", formData)
      .then((res) => {
        messageApi.success({
          message: `Updated Request Sucess`,
          description: `${res.data.massage}`,
          placement: "top",
        });
        setLoading(false);

        dispatch(instructorUpdateSucess(res.data.updateDate));
        setTimeout(()=>{ refresh(0)},2500)
      
      
      })
      .catch((err) => {
        messageApi.error({
          message: `Updated Request Filed`,
          description: `${
            err?.response?.data?.massage || "Internal Server Error "
          } `,
          placement: "top",
        });
        setLoading(false);

        return false;
      });
 
    setResetfile("text");
    setTimeout(() => {
      setResetfile("file");
    }, 0);

  
  };

// ============================================
  const resetPassword = (e) => {
    e.preventDefault();
    if (resetEmail === "") {
      messageApi.error({
        message: `Email  Field Error`,
        description: `Please enter email`,
        placement: "top",
      });
      return false;
    }

    setLoading(true);



    axios
      .put("https://dreamsachool-y2s8.onrender.com/api/instractor/forget", { resetEmail })
      .then((res) => {
        setEmailSucessMasssage(res.data.massage);
        setReset(true);
        setPasswordId(res.data.id);
        setLoading(false);
      })
      .catch((err) => {
        messageApi.error({
          message: `Updated Request Filed`,
          description: `${
            err?.response?.data?.massage || "Internal Server Error "
          } `,
          placement: "top",
        });
        setLoading(false);
        return false;
      });

    setResetEmail("");
  };


  
  const updatePassword = (e) => {
    e.preventDefault();
    setLoading(true);
   
    if (resetpassword === "" || confrimPassword === "") {
      messageApi.error({
        message: `Updated Password Filed`,
        description: `{Update password is required } `,
        placement: "top",
      });
      setLoading(false);
      return false;
    } else if (confrimPassword !== resetpassword) {
      messageApi.error({
        message: `Updated Password Filed`,
        description: `{Confirm  password does'nt match } `,
        placement: "top",
      });

      setLoading(false);
      return false;
    } else {
      axios
        .put("https://dreamsachool-y2s8.onrender.com/api/instractor/forget", {
          passwordId,
          resetpassword,
        })
        .then((res) => {
          messageApi.success({
            message: `Udated Rpequest Filed`,
            description: `${res?.data?.massage} `,
            placement: "top",
          });

         dispatch(instructorUpdateSucess(res.data.resetPassword));
          setLoading(false);
        })
        .catch((err) => {
          messageApi.error({
            message: `Updated Request Filed`,
            description: `${
              err?.response?.data?.massage || "Internal Server Error "
            } `,
            placement: "top",
          });
          setLoading(false);

          return false;
        });
    }

    setTimeout(() => {
      setReset(false);
      setResetPassword("");
      setConfrimPassword("");
    }, 2000);
  };

  return (
    <div className={seetingStyle.contairs}>
      <nav>
        <p onClick={() => setToggle("profile")}> update profile </p>
        <p onClick={() => setToggle("forgot")}> forget password </p>
      </nav>
      {inputErrorMassage}

      {toggle === "profile" && (
        <div className={seetingStyle.profileUpdate}>
          {/* <button onClick={   Location(0)}>FF</button> */}
          <div className={seetingStyle.updateDeleils}>
            <img src={updateProfile} alt="" />

            <form onSubmit={updateInstrutorHandler}>
              <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>
                {` updated instructor ${toggle} deteil`}
              </h3>

              <div>
                <div>
                  <label>
                    {" "}
                    Name <sup>*</sup>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className={seetingStyle.NameFiled}>
                <div>
                  <label>
                    {" "}
                    Email<sup>*</sup>{" "}
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label>
                    {" "}
                    Phone <sup>*</sup>{" "}
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className={seetingStyle.profileAvater}>
                <label> Profile img </label> <br />
                <input
                  type={resetFile}
                  name="profileImg"
                  onChange={(e) => setAvater(e.target.files[0])}
                />
              </div>

              <div>
                <button type="submit">
                  {" "}
                  {loding ? "Loading..." : "UPDATE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {toggle === "forgot" && (
        <div className={seetingStyle.profileUpdate}>
          <div className={seetingStyle.updateDeleils}>
            <img src={updateProfile} alt="" />

            <form>
              <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>
                {`  ${toggle} instructor password`}
                <br />
              </h3>

              {!reset ? (
                <>
                  <div>
                    <label>
                      {" "}
                      Email address <sup>*</sup>
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      placeholder="Enter registered email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <button onClick={resetPassword}>
                      {loding ? "Loading..." : "Verify"}{" "}
                    </button>
                  </div>
                </>
              ) : (
                <Alert
                  message="Email verification success"
                  style={{ margin: "5px 0px" }}
                  type="success"
                  showIcon
                />
              )}

              {reset && (
                <>
                  <div>
                    <label>
                      {" "}
                      New Password <sup>*</sup>{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      placeholder="New Password"
                      value={resetpassword}
                      onChange={(e) => setResetPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>
                      {" "}
                      Confirm Password<sup>*</sup>{" "}
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      placeholder="Confirm Password"
                      value={confrimPassword}
                      onChange={(e) => setConfrimPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <button onClick={updatePassword}>
                      {loding ? "loading..." : "UPDATE"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
