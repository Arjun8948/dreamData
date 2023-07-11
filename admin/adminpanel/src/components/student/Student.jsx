import React, { useEffect, useState } from "react";
import studentStyle from "./student.module.css";
import axios from "axios";
import { Button, Modal, Table, notification } from "antd";
import moment from "moment";
import {FiUsers} from "react-icons/fi"
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Class",
    dataIndex: "class",
    key: "class",
  },
  {
    title: "Board",
    dataIndex: "board",
    key: "board",
  },
  {
    title: "Batch",
    dataIndex: "batch",
    key: "batch",
  },
  {
    title: "Batch Status",
    dataIndex: "batchStatus",
    key: "batchStatus",
  },

  {
    title: "Enroll Status",
    dataIndex: "enrollStatus",
    key: "enrollStatus",
  },
  {
    title: "Start",
    dataIndex: "start",
    key: "start",
  },

  {
    title: "Update",
    dataIndex: "update",
    key: "update",
  },

  {
    title: "Delete",
    dataIndex: "delete",
    key: "delete",
  },
];

const Student = () => {
  const [studentData, setStudenData] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const [batch, setBatch] = useState("");
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const getStudentData = () => {
    setLoading(true);
    axios
      .get(`https://dearmschool.com/api/student?batch=${batch}`)
      .then((res) => {
        console.log(res.data);
        setStudenData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });
  };

  useEffect(() => {
    axios
      .get(`https://dearmschool.com/api/student/bacth`)
      .then((res) => {
        console.log("batch", res.data);
        setBatchData(res.data);
      })
      .catch((err) => {
        throw err;
      });
    getStudentData();
  }, [batch]);

  const studentdeleteHandler = (id) => {
    axios
      .delete(`https://dearmschool.com/api/student/dalete?id=${id}`)
      .then((res) => {
        api.success({
          message: `Student Deletion Success`,
          description: `${res.data.massage || "Internal server error"}`,
          placement: "top",
        });
      })
      .catch((err) => {
        api.error({
          message: `Student Deletion filed`,
          description: `${
            err.response.data.massage || "Internal server error"
          }`,
          placement: "top",
        });

        return false;
      });
    getStudentData();
  };

  const studentTable = studentData.map((data) => {
    const studentData = {
      name: data.firstName + " " + data.lastName,
      phone: data.phone,
      class: data.className,
      board: data.boardName,
      batch: data.batch,
      batchStatus: data.batchStatus,
      enrollStatus: data.enroll,
      start: moment(data.start).format("DD-MMMM-YY"),
      update: (
        <StudentUpdate
          firstName={data.firstName}
          lastName={data.lastName}
          phone={data.phone}
          className={data.className}
          id={data._id}
          board={data.boardName}
          batchStatus={data.batchStatus}
          batch={data.batch}
          enrollStatus={data.enroll}
          start={moment(data.start).format("DD-MMMM-YY")}
          getStudentData={getStudentData}
        />
      ),
      delete: (
        <Button
          type="primary"
          danger
          onClick={() => studentdeleteHandler(data._id)}
        >
          Delete
        </Button>
      ),
    };
    return studentData;
  });

const upboard  =studentData.filter((item)=>{
  const data =item.boardName==="UP BOARD"
  return data
})

const Mhboard  =studentData.filter((item)=>{
  const data =item.boardName==="MH BOARD"
  return data
})

const jhboard  =studentData.filter((item)=>{
  const data =item.boardName==="JH BOARD"
  return data
})

const Mpboard  =studentData.filter((item)=>{
  const data =item.boardName==="MP BOARD"
  return data
})

 
const other  =studentData.filter((item)=>{
  const data =item.boardName==="Other"
  return data
})

  return (
    <>
      {contextHolder}

      <div className={studentStyle.studentModelDiv}>
        <div className={studentStyle.boardInfoData}>
          <div style={{backgroundColor:"#FF4D4F"}}>
            <span> Student</span>
            <section>
            <FiUsers size={30}/>
              {studentData.length}
            </section>
          </div>
          <div style={{backgroundColor:"lightgreen"}}>
            <span> UP Board</span>
            <section>
            <FiUsers size={30}/>
              {upboard.length}
            </section>
          </div>
     
          <div style={{backgroundColor:"yellow"}}>
            <span>Jharkhand Board</span>
            <section>
            <FiUsers size={30}/>
              {jhboard.length}
            </section>
          </div>
          <div style={{backgroundColor:"#E3F1FA"}}>
            <span>MH Board</span>
            <section>
            <FiUsers size={30}/>
              {Mhboard.length}
            </section>
          </div>

          <div style={{backgroundColor:"#E3F1FA"}}>
            <span>MP Board</span>
            <section>
            <FiUsers size={30}/>
              {Mpboard.length}
            </section>
          </div>
          <div style={{backgroundColor:"#1677FF"}}>
            <span>Other</span>
            <section>
            <FiUsers size={30}/>
              {other.length}
            </section>
          </div>
        </div>
        <div className={studentStyle.studentBtn}>
          <select onChange={(e) => setBatch(e.target.value)}>
            <option value={""}>Choose batch</option>
            {batchData.map((res) => (
              <option value={res}>{res}</option>
            ))}
          </select>

          <Button type="primary" onClick={getStudentData}>
            Refresh
          </Button>
        </div>
        <div>
          <Table style={{height:'59vh'}}
            columns={columns}
            pagination={{ pageSize: 3 }}
            loading={loading}
            dataSource={studentTable}
          />
        </div>
      </div>
    </>
  );
};

export default Student;

const StudentUpdate = ({
  id,
  firstName,
  lastName,
  board,
  batch,
  batchStatus,
  start,
  phone,
  enrollStatus,
  className,
  getStudentData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setUpdateData({
      id: id,
      firstName: firstName,
      lastName: lastName,
      boardName: board,
      batch: batch,
      className: className,
      batchStatus: batchStatus,
      enroll: enrollStatus,
      phone: phone,
      start: start,
    });
  }, [id]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(updateData);
    axios
      .put(`https://dearmschool.com/api/student/updateadmin`, {
        ...updateData,
      })
      .then((res) => {
        api.success({
          message: `Student Updetion Success`,
          description: `${res.data.massage}`,
          placement: "top",
        });
        getStudentData();
      })
      .catch((err) => {
        api.error({
          message: `Student Updetion filed`,
          description: `${
            err.response.data.massage || "Internal server error"
          }`,
          placement: "top",
        });

        return false;
      });
    getStudentData();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateDataInput = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal
        title="Student Update Model"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={studentStyle.updateForm}>
          <div className={studentStyle.Name}>
            <div>
              <label htmlFor="">
                First name <sup>*</sup>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder=" Enter firstName"
                value={updateData.firstName}
                onChange={updateDataInput}
              />
            </div>

            <div>
              <label htmlFor="">
                Last name <sup>*</sup>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder=" Enter lastName"
                value={updateData.lastName}
                onChange={updateDataInput}
              />
            </div>
          </div>

          {/*================================================================================  */}
          <div className={studentStyle.Name}>
            <div>
              <label htmlFor="">
                Phone <sup>*</sup>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone"
                value={updateData.phone}
                onChange={updateDataInput}
              />
            </div>

            <div>
              <label htmlFor="">
                Class Name <sup>*</sup>
              </label>
              <input
                type="text"
                name="className"
                placeholder=" Enter className"
                value={updateData.className}
                onChange={updateDataInput}
              />
            </div>
          </div>
          {/* =========================================================================================== */}

          <div className={studentStyle.Name}>
            <div>
              <label htmlFor="">
                Board Name <sup>*</sup>
              </label>
              <input
                type="text"
                name="boardName"
                placeholder=" Enter boardName"
                value={updateData.boardName}
                onChange={updateDataInput}
              />
            </div>

            <div>
              <label htmlFor="">
                Batch <sup>*</sup>
              </label>
              <input
                type="text"
                name="batch"
                placeholder=" Enter batch"
                value={updateData.batch}
                onChange={updateDataInput}
              />
            </div>
          </div>

          {/* ======================================================================================= */}

          <div className={studentStyle.Name}>
            <div>
              <label htmlFor="">
                Batch status <sup>*</sup>
              </label>
              <input
                type="text"
                name="batchStatus"
                placeholder="Enter batchStatus"
                value={updateData.batchStatus}
                onChange={updateDataInput}
              />
            </div>

            <div>
              <label htmlFor="">
                Enroll status <sup>*</sup>
              </label>
              <input
                type="text"
                name="enroll"
                placeholder="Enter enrollStatus"
                value={updateData.enroll}
                onChange={updateDataInput}
              />
            </div>
          </div>

          {/* ================================================================================================================================ */}

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              color: "#fff",
            }}
          >
            <label htmlFor="">
              Start date <sup>*</sup>
            </label>
            <input
              style={{
                padding: "8px",
                backgroundColor: "transparent",
                border: "0.3px solid #e4dfdf",
                outline: "none",
                borderRadius: "4px",
              }}
              type="date"
              name="start"
              placeholder="Enter start date"
              value={updateData.start}
              onChange={updateDataInput}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};



