import React, { useEffect, useState } from 'react';
import { Button, Modal, Progress, Select, notification } from 'antd';
import axios from "axios"
import { useSelector } from 'react-redux';
import { BsPersonFillAdd } from 'react-icons/bs';
import addAdminStyle from "./addAdmin.module.css"
const Addadmin = () => {
  const admin = useSelector((state) => state.currentAdmin)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phone: "",
    adminType: "",
    state: "",
    joining: "",
    password: "",
    confirmPassword: ""
  })
  const [adminProfile, setAdminProfile] = useState(null)
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resetFile, setFile] = useState('file')
  const adminInput = (e) => {
    setAdminData({
      ...adminData, [e.target.name]: e.target.value
    })
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(adminData);
    const mailformat = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');


    if (adminData.name === "" || adminData.name === null) {
      api.error({
        message: `Name Field Required`,
        description: 'Please enter admin name',
        placement: 'top'
      });
      return false;
    }

     if (adminData.name.length < 3) {
      api.error({
        message: `Name Field Eroor`,
        description: 'Please enter more than three character',
        placement: 'top'
      });
      return false;
    }

     if (adminData.name.length > 15) {
      api.error({
        message: `Name Field Eroor`,
        description: 'Please enter less than three character',
        placement: 'top'
      });
      return false;
    }
    if(((/[A-z]+\d/g).test(adminData.name))){
      api.error({
        message: `Name Field Eroor`,
          description: `Enter name only charector`,
          placement: "top",
        });
        return false;
    }


     if (adminData.email === "" || adminData.email === null) {
      api.error({
        message: `Email Field Required`,
        description: 'Please enter admin email',
        placement: 'top'
      });
      return false;
    }
  if (!adminData.email.match(mailformat)) {
      api.error({
        message: `Email Field Eroor`,
        description: 'Please enter valid email',
        placement: 'top'
      });
      return false;
    }

 if (adminData.phone === "" || adminData.phone === null) {
      api.error({
        message: `Phone Field Required`,
        description: 'Please enter admin phone',
        placement: 'top'
      });
      return false;
    }


  if (adminData.phone.length < 10 || adminData.phone.length > 10) {
      api.error({
        message: `Phone Field Eroor`,
        description: 'Please enter 10 digit number',
        placement: 'top'
      });
      return false;
    }



  if (adminData.adminType === "" || adminData.adminType === null) {
      api.error({
        message: `Admin Type Required`,
        description: 'Please select admin type',
        placement: 'top'
      });
      return false;
    }


  if (adminData.state === "" || adminData.state === null) {
      api.error({
        message: `State Field Required`,
        description: 'Please select admin state',
        placement: 'top'
      });
      return false;
    }



  if (adminData.joining === "" || adminData.joining === null) {
      api.error({
        message: `Joining Field Required`,
        description: 'Please choose joining date',
        placement: 'top'
      });
      return false;
    }


  if (adminData.password === "" || adminData.password === null) {
      api.error({
        message: `Password Field Required`,
        description: 'Please enter admin password',
        placement: 'top'
      });
      return false;
    }


  if (adminData.password.length < 8 || adminData.password.length > 15) {
      api.error({
        message: `Password Field Error`,
        description: 'Please Enter 8 digit password',
        placement: 'top'
      });
      return false;
    }
    if (adminData.confirmPassword === "" || adminData.confirmPassword === null) {
      api.error({
        message: `Confirm Password Required`,
        description: 'Please enter confirm password',
        placement: 'top'
      });
      return false;
    }

   if (adminData.confirmPassword !== adminData.password) {
      api.error({
        message: `Confirm Password Field Error`,
        description: 'Confirm password does not match',
        placement: 'top'
      });
      return false;
    }

    if (adminProfile === null || adminProfile === "") {
      api.error({
        message: `Profile Image Error`,
        description: 'Please choose profile image',
        placement: 'top'
      });
      return false;
    }
    else {
      const formData = new FormData();
      formData.append("name", adminData.name)
      formData.append("email", adminData.email)
      formData.append("phone", adminData.phone)
      formData.append("adminType", adminData.adminType)
      formData.append("state", adminData.state)
      formData.append("joining", adminData.joining)
      formData.append("password", adminData.password)
      formData.append("adminImg", adminProfile)
      // setLoading(true)

      axios.post(`https://dearmschool.com/api/admin/signup`, formData, {
        onUploadProgress: (event) => {
          const Progessdata = (Math.round((event.loaded * 100) / event.total))
          setProgress(Progessdata)
        },
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data"
        }
      }).then((res) => {
        setLoading(false)
       
        api.success({
          message: `Admin Registration Success`,
          description: `${res.data.massage}`,
          placement: 'top'
        });

        setProgress(null)
      }).catch((err) => {
        api.error({
          message: `Admin Registration Field`,
          description: `${err.response.data.massage || "Internal Server Error"}`,
          placement: 'top'
        });
        setLoading(false)
        setProgress(null)
        return false;
      })

    }

     setAdminData({
      name:"",
      email:"",
      phone:"",
      adminType:"",
      state:"",
      joining:"",
      password:"",
      confirmPassword:""
     })

    setFile('text')
    setAdminProfile(null)

    setTimeout(() => {

      // setIsModalOpen(false);
      setFile('file')
    }, 0)
    setTimeout(() => {

      setIsModalOpen(false);

    }, 2000)



  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <p style={{
        height: "100%", width: "100%", display: "flex", padding: "10px 10px",
        justyContent: "center", alignItems: "center", gap: "5px"
      }} onClick={() => (admin?.adminType !== "root") ?
        api.error({
          message: `New Admin  Registration Error`,
          description: "Root Admin Only Doing Registration",
          placement: "top",
        })
        : showModal()}>
        < BsPersonFillAdd size={18} /> New Admin
      </p>
      <Modal title="New Admin Registration" width={500} style={{ color: "balck" }}
        open={isModalOpen} okText={(loading) ? "Loading.." : "New Registration"} onOk={handleOk} onCancel={handleCancel}>
        <div className={addAdminStyle.div}>
          <div className={addAdminStyle.subdiv}>
            <div>
              <section>
                <label htmlFor="">Name <sup>*</sup></label> <br />
                <input type="text" name='name' placeholder='Enter admin name' onChange={adminInput} value={adminData.name} />
              </section>
              {/* =============================================== */}
              <section>
                <label htmlFor="">Email <sup>*</sup></label> <br />
                <input type="text" name='email' placeholder='Enter admin email' onChange={adminInput} value={adminData.email} />
              </section>
            </div>
            {/* =============================================== */}
            <div>
              <section>
                <label htmlFor="">Phone <sup>*</sup></label> <br />
                <input type="text" name='phone' placeholder='Enter  phone number' onChange={adminInput} value={adminData.phone} />
              </section>
              {/* =============================================== */}
              <section >
                <label htmlFor="">Type <sup>*</sup></label> <br />
                <select style={{
                  width: "180px", padding: '6px',
                  border: '0.5px solid rgb(189, 186, 186)',
                  borderRadius: "3px",
                  backgroundColor: "transparent", outline: "none"
                }} name="adminType" onChange={adminInput} value={adminData.adminType}>
                  <option >Select admin type</option>
                  <option value="root">Root</option>
                  <option value="sub">Subadmin</option>

                </select>
              </section>
            </div>
            {/* =============================================== */}
            <div  >
              <section>
                <label htmlFor=""> State  <sup>*</sup></label> <br />
                <select style={{
                  width: "180px", padding: '6px',
                  border: '0.5px solid rgb(189, 186, 186)',
                  borderRadius: "3px",
                  outline: "none", backgroundColor: "transparent"
                }} name="state" onChange={adminInput} value={adminData.state}>
                  <option >Select admin state</option>

                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chattisgarh">Chattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himanchal Pradesh">Himanchal Pradesh</option>
                  <option value="Jammu and Kashmi">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="kerala">kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Orissa">Orissa</option>
                  <option value="Panjab">Panjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Utter Pradesh">Utter Pradesh</option>
                  <option value="Maharashtra">Uttarakhand</option>



                </select>
              </section>
              {/* =============================================== */}
              <section>
                <label htmlFor="">Joining <sup>*</sup></label> <br />
                <input style={{ width: "180px", padding: '6px', outline: "none" }} type="date" name='joining' value={adminData.joining} onChange={adminInput} />

              </section>
            </div>
            {/* =============================================== */}
            <div>
              <section>
                <label htmlFor="">Password <sup>*</sup></label> <br />
                <input type="password" name='password' placeholder='Enter 8 digit password' value={adminData.password} onChange={adminInput} />
              </section>
              <section>
                <label htmlFor="">Confirm Password <sup>*</sup></label> <br />
                <input type="text" name='confirmPassword' placeholder='Enter confirm password' value={adminData.confirmPassword} onChange={adminInput} />
              </section>
            </div>
            <section style={{
              width: "100%", padding: "6px",
              border: '0.5px solid rgb(189, 186, 186)',
              borderRadius: "3px",

            }}>
              <label htmlFor="">Profile Img <sup>*</sup></label> <br />
              <input type={resetFile} style={{ padding: "3px",backgroundColor:"transparent" ,border:"none",outline:"none" }} name='adminImg' onChange={(e) => setAdminProfile(e.target.files[0])} />
              {
                progress && <Progress percent={progress} />
              }
            </section>
            {/* =============================================== */}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Addadmin


