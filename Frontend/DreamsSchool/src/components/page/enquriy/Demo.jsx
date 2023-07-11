import { Button, Input, InputNumber, Modal, Result, Select, notification } from 'antd';
import { useRef, useState } from 'react';
import navStyle from "../../css/navber/Navbar.module.css"
import demoStyle from "../../css/enquriy/Demo.module.css"
import axios from 'axios';
const { TextArea } = Input;

const Demo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [statusCode, setStatusCode] = useState(null);
  const [messageApi, inputErrorMassage] = notification.useNotification();
  const [enquiryData, setEnquiryData] = useState({
    name: "",
    email: "",
    number: "",
    massage: ""
    });



  const showModal = () => {
    setIsModalOpen(true);
  };
  const enquiryInputHandler = (e) => {
    setEnquiryData({ ...enquiryData, [e.target.name]: e.target.value })

  }
  const handleOk = () => {
    const nameRegex = new RegExp("^[a-zA-Z]+$");
    const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')


    if (enquiryData.name === "") {
      messageApi.error({
        message: `Name Field Error`,
        description: 'Name Is Required',
        placement: 'top',

      })
      return false;
    }

    else if ((enquiryData.name)?.match(nameRegex)) {

      messageApi.error({
        message: `Name Field Error`,
        description: 'Enter Name Only Charecter',
        placement: 'top',

      })
      return false;
    }

    else if (enquiryData.name.length < 3) {

      messageApi.error({
        message: `Name Field Error`,
        description: 'Enter Last Name More Than 3 Charecter.',
        placement: 'top',

      })
      return false;
    }
    else if (enquiryData.email === "") {

      messageApi.error({
        message: `Email Field Error`,
        description: 'Email IsRequired',
        placement: 'top',

      })

      return false;
    }

    else if ((enquiryData.email).search(emailRegex)) {

      messageApi.error({
        message: `Email Field Error`,
        description: 'Enter your Valid Email ',
        placement: 'top',

      })
      return false;
    }

    else if(enquiryData.number === "") {

      messageApi.error({
        message: `Phone Number Field Error`,
        description: 'Enter Your Number',
        placement: 'top',

      })
      return false;
    }

    else if (enquiryData.number.length < 10 || enquiryData.number.length > 10) {

      messageApi.error({
        message: `Phone Number Field Error`,
        description: 'Enter 10 Digit Number',
        placement: 'top',

      })
      return false;
    }
    else if (enquiryData.massage === "") {
      
      messageApi.error({
        message: `Massage Field Error`,
        description: 'Enter Your Enquiry Massage',
        placement: 'top',

      })
      return false;
    }

    else {
      axios.post('https://dearmschool.com/api/enquairy',
        {...enquiryData})
        .then((res) => setStatusCode(res.data.status))
        .catch((err) => setStatusCode(err.response?.data?.status))
    }

    setTimeout(() => { setStatusCode(null); }, 3000)
    setEnquiryData("");

};

const handleCancel = () => {
    setIsModalOpen(false);
    setStatusCode(null)
  };



  return (
    <>
      {inputErrorMassage}
      <span className={navStyle.demoBtn}

        style={{
          fontFamily: "'Roboto', sans-serif", fontWeight: 510,
        }} onClick={showModal}> Enquiry now </span>

      <Modal className={demoStyle.model} title="Enquiry now "
        open={isModalOpen} okText={(statusCode === null) ? "Send" : "Ok"}
        onOk={(statusCode === null) ? handleOk : handleCancel}
        onCancel={handleCancel}>
        {(statusCode === null) ?
          <div style={{ padding: "10px 10px" }}>

            <Input placeholder='Enter name' name='name' value={enquiryData.name} autoComplete='off'
              style={{ margin: "5px 0px", padding: "8px" }} onChange={enquiryInputHandler} />
            <Input placeholder='Enter email' name='email' autoComplete='off'
              style={{ margin: "5px 0px", padding: "8px" }} value={enquiryData.email} onChange={enquiryInputHandler} />
            <Input   addonBefore="+91" name='number' value={enquiryData.number}  placeholder='Enter number'
              style={{ margin: "5px 0px 13px 0px" }}  onChange={enquiryInputHandler} />

            <TextArea rows={6} name='massage' placeholder="write a massage"
              onChange={enquiryInputHandler} value={enquiryData.massage} />
          </div>
          : (statusCode === 200) ? <Result
            status="success"
            title="Your Request Scuseefully Submmited"
            subTitle="Dreams school team contact you under 24 hours, please wait."
            style={{ backgroundColor: 'white', color: "green", borderRadius: "3px" }}
          /> : (statusCode === 409) ? <Result
            status="warning"
            title="Your Request Already Submmited"
            subTitle="Please wait. dreams school team contact you with in 24 hours !"
            style={{ backgroundColor: 'white', borderRadius: "3px" }}
          /> : (statusCode === 500) ? <Result
            status="500"
            title="Internal Server Field Error"
            subTitle="Sorry, something went wrong."
            style={{ backgroundColor: 'white', borderRadius: "3px" }}
          /> : <Result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
            style={{ backgroundColor: 'white', borderRadius: "3px" }}
          />

        }

      </Modal>

    </>
  );
};
export default Demo;



