import React, { useEffect, useState } from "react";

import { Avatar, Button, Modal, Table, notification } from "antd";
import boardStyle from "./addboard.module.css";
import { Autoplay } from "swiper";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const columns = [
  {
    title: "Board Name",
    dataIndex: "boardName",
    key: "boardName",
  },
  {
    title: "class Name",
    dataIndex: "className",
    key: "className",
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Start",
    dataIndex: "start",
    key: "start",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "stutus",
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
const AddBoardClass = () => {
  const [getBoardData, setBoardData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [loading,setLoading]=useState(false)

  const boardData = () => {
    setLoading(true)
    axios
      .get(`https://dearmschool.com/api/getclass`)
      .then((res) => {
        setBoardData(res.data);
    setLoading(false)

      })
      .catch((err) => {
    setLoading(false)

        throw err
      });
  };

  useEffect(() => {
    boardData();
  }, []);

  const DeleteHandlaer = (id) => {
    axios
      .delete(`https://dearmschool.com/api/deleteclass?id=${id}`)
      .then((res) => {
        api.success({
          message: `Board  class deletion success`,
          description: `${res.data.massage}`,
          placement: "top",
        });
        boardData();
      })
      .catch((err) => {
        api.error({
          message: `Board  class deletion field`,
          description: `${
            err.response.data.massage || "Internal server error"
          }`,
          placement: "top",
        });
        return false;
      });
    boardData();
  };

  const tableData = getBoardData.map((res) => {
    const data = {
      boardName: res.boardName,
      className: res.className,

      subject: res.subject,
      price: res.price,
      start: res.start,
      status: res.status,
      update: (
        <UpdateModel
          id={res._id}
          board={res.boardName}
          status={res.status}
          className={res.className}
          start={res.start}
          price={res.price}
          subject={res.subject}
          Refreseh={boardData}
        />
      ),
      delete: (
        <Button type="primary" danger onClick={() => DeleteHandlaer(res._id)}>
          Delete
        </Button>
      ),
    };
    return data;
  });

  return (
    <div className={boardStyle.boardMainCantenar}>
      {contextHolder}
      <div className={boardStyle.boardSlider}>
        <Swiper
          // install Swiper modules
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={4}
          autoplay={true}
        >
          {getBoardData.map((board) => (
            <SwiperSlide
              style={{
                height: "auto",
                width: "220px",
                backgroundColor: "#1699FF",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              <div>
                <img
                  src={board.imageUrl}
                  alt=""
                  style={{ borderRadius: "5px" }}
                  width={"100%"}
                  height={150}
                />
              </div>
              <div
                style={{
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#001529",
                  alignItems: "center",
                  borderRadius: "5px",
                  color: "#fff",
                  margin: "5px",
                  fontSize:"12px"
                }}
              >
                <Avatar src={board.boardUrl} />

                <span>{board.boardName}</span>
              </div>

              <div
                style={{
                  padding: "5px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#001529",
                  alignItems: "center",
                  borderRadius: "5px",
                  color: "#fff",
                  margin: "5px",
                  fontSize:"12px"

                }}
              >
                <span>{board.subject}</span>
                <span>{board.price}</span>
              </div>
              <div
                style={{
                  padding: "5px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#001529",
                  alignItems: "center",
                  borderRadius: "5px",
                  color: "#fff",
                  margin: "5px",
                  fontSize:"12px"

                }}
              >
                <span>{board.start}</span>
                <span>{board.status}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={boardStyle.boardBtn}>
        <Button onClick={boardData}>Refresh</Button>
        <AddModel boardData={boardData} />
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={{ pageSize: 3 }}
        />
      </div>
    </div>
  );
};

export default AddBoardClass;

const AddModel = ({ boardData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [addClass, setAddBoard] = useState({
    boardName: "",
    subject: "",
    price: "",
    className: "",
    start: "",
    status: "",
  });

  const [modelImg, setModelImg] = useState(null);
  const [boardImg, setBoardImg] = useState(null);
  const [resetInput, setResetInput] = useState("file");

  const addInputHandler = (e) => {
    setAddBoard({
      ...addClass,
      [e.target.name]: e.target.value,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (addClass.boardName === "" || addClass.boardName === null) {
      api.error({
        message: `Board Name Error`,
        description: `Please enter board name`,
        placement: "top",
      });
      return false;
    }

    if (addClass.subject === "" || addClass.subject === null) {
      api.error({
        message: `Board Subject Name Error`,
        description: `Please enter subject name`,
        placement: "top",
      });
      return false;
    }

    if (addClass.className === "" || addClass.className === null) {
      api.error({
        message: `Board Class Name Error`,
        description: `Please enter class name`,
        placement: "top",
      });
      return false;
    }

    if (addClass.price === "" || addClass.price === null) {
      api.error({
        message: `Board class price Error`,
        description: `Please enter class price`,
        placement: "top",
      });
      return false;
    }

    if (addClass.start === "" || addClass.start === null) {
      api.error({
        message: `Board class Start  Error`,
        description: `Please enter classs start date`,
        placement: "top",
      });
      return false;
    }

    if (addClass.status === null || addClass.status === "") {
      api.error({
        message: `Board class Status Error `,
        description: `Please enter class status`,
        placement: "top",
      });
      return false;
    }

    if (modelImg === null) {
      api.error({
        message: `Board Class Banner Upload Error`,
        description: `Please upload class banner Image`,
        placement: "top",
      });
      return false;
    }
    if (boardImg === null) {
      api.error({
        message: `Board  Image Upload Error`,
        description: `Please upload  Board Image`,
        placement: "top",
      });
      return false;
    }

    const formData = new FormData();
    formData.append("boardName", addClass.boardName.replace(" ","").toLowerCase());
    formData.append("subject", addClass.subject);
    formData.append("className", addClass.className);

    formData.append("price", addClass.price);
    formData.append("start", addClass.start);

    formData.append("status", addClass.status);
    formData.append("imageUrl", modelImg);
    formData.append("boardUrl", boardImg);

    axios
      .post(`https://dearmschool.com/api/addclass`, formData)
      .then((res) => {
        api.success({
          message: `Board class upload success`,
          description: `${res.data.massage}`,
          placement: "top",
        });
        boardData();
      })
      .catch((err) => {
        api.error({
          message: `Board  class upload field`,
          description: `${
            err.response.data.massage || "Internal server error"
          }`,
          placement: "top",
        });
        return false;
      });
    boardData();
    setResetInput("text");
    setAddBoard({
      boardName: "",
      subject: "",
      price: "",
      start: "",
      className: "",
      status: "",
    });

    setTimeout(() => {
      setResetInput("file");
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Add Board Class
      </Button>
      <Modal
        title="board class upload"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={boardStyle.updatediv}>
          <div
            className={boardStyle.subdiv}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div>
              <label htmlFor="">
                Board name <sup>*</sup>
              </label>
              <input
                type="text"
                name="boardName"
                placeholder="Enter Board Name"
                value={addClass.boardName}
                onChange={addInputHandler}
              />
            </div>

            <div>
              <label htmlFor="">
                Subject <sup>*</sup>
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Enter subject Name"
                value={addClass.subject}
                onChange={addInputHandler}
              />
            </div>
          </div>

          <div
            className={boardStyle.subdiv}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div>
              <label htmlFor="">
                Class <sup>*</sup>
              </label>
              <input
                type="text"
                name="className"
                placeholder="Enter class Name"
                value={addClass.className}
                onChange={addInputHandler}
              />
            </div>

            <div>
              <label htmlFor="">
                Price <sup>*</sup>
              </label>
              <input
                type="text"
                name="price"
                placeholder="Enter price"
                value={addClass.price}
                onChange={addInputHandler}
              />
            </div>
          </div>

          <div
            className={boardStyle.subdiv}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div>
              <label htmlFor="">
                Start <sup>*</sup>
              </label>
              <input
                type="date"
                name="start"
                placeholder="Enter start"
                value={addClass.start}
                onChange={addInputHandler}
              />
            </div>

            <div>
              <label htmlFor="">
                Status <sup>*</sup>
              </label>
              <input
                type="text"
                name="status"
                placeholder="Enter status"
                value={addClass.status}
                onChange={addInputHandler}
              />
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <label htmlFor="">
              Course image <sup>*</sup>
            </label>
            <input
              type={resetInput}
              name="imageUrl"
              onChange={(e) => setModelImg(e.target.files[0])}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <label htmlFor="">
              Board image <sup>*</sup>
            </label>
            <input
              type={resetInput}
              name="boardUrl"
              onChange={(e) => setBoardImg(e.target.files[0])}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

const UpdateModel = ({
  id,
  board,
  subject,
  price,
  status,
  start,
  className,
  Refreseh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setUpdatedData({
      id: id,
      boardName: board,
      subject: subject,
      price: price,
      status: status,
      start: start,
      className: className,
    });
  }, [id]);

  const updateDataHandler = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (updatedData.boardName === null || updatedData.boardName === "") {
      api.error({
        message: `Board name field`,
        description: `Please enter board name`,
        placement: "top",
      });
      return false;
    }

    if (updatedData.subject === null || updatedData.subject === "") {
      api.error({
        message: `Subject name field`,
        description: `Please enter subject name`,
        placement: "top",
      });
      return false;
    }

    if (updatedData.className === null || updatedData.className === "") {
      api.error({
        message: `Class name field`,
        description: `Please enter class name`,
        placement: "top",
      });
      return false;
    }

    if (updatedData.price === null || updatedData.price === "") {
      api.error({
        message: `Price  field error`,
        description: `Please enter price name`,
        placement: "top",
      });
      return false;
    }

    if (updatedData.start === null || updatedData.start === "") {
      api.error({
        message: `Start date field  error`,
        description: `Please enter start date`,
        placement: "top",
      });
      return false;
    }
    if (updatedData.status === null || updatedData.status === "") {
      api.error({
        message: `Status field error`,
        description: `Please enter status`,
        placement: "top",
      });
      return false;
    }

    axios
      .put(`https://dearmschool.com/api/updateclass`, { ...updatedData })
      .then((res) => {
        api.success({
          message: `Board Class Deteils Updetion Success`,
          description: `${res.data.massage}`,
          placement: "top",
        });
        Refreseh();
      })
      .catch((err) => {
        api.error({
          message: `Board Class Deteils Updetion field`,
          description: `${err.response.data.massage}`,
          placement: "top",
        });
        return false;
      });

    // setTimeout(()=>{
    //   window.location.reload();
    // },1000)

    Refreseh();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal
        title="Board class Update"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={boardStyle.updatediv}>
          <div
            className={boardStyle.subdiv}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div>
              <label htmlFor="">
                Board name <sup>*</sup>
              </label>
              <input
                type="text"
                name="boardName"
                placeholder="Enter Board Name"
                value={updatedData.boardName}
                onChange={updateDataHandler}
              />
            </div>

            <div>
              <label htmlFor="">
                Class name <sup>*</sup>
              </label>
              <input
                type="text"
                name="className"
                placeholder="Enter Class Name"
                value={updatedData.className}
                onChange={updateDataHandler}
              />
            </div>
          </div>

          <div
            className={boardStyle.subdiv}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div>
              <label htmlFor="">
                Subject <sup>*</sup>
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Enter subject Name"
                value={updatedData.subject}
                onChange={updateDataHandler}
              />
            </div>

            <div>
              <label htmlFor="">
                Price <sup>*</sup>
              </label>
              <input
                type="text"
                name="price"
                placeholder="Enter price"
                value={updatedData.price}
                onChange={updateDataHandler}
              />
            </div>
          </div>

          <div
            className={boardStyle.subdiv}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div>
              <label htmlFor="">
                Start <sup>*</sup>
              </label>
              <input
                type="text"
                name="start"
                placeholder="Enter start"
                value={updatedData.start}
                onChange={updateDataHandler}
              />
            </div>

            <div>
              <label htmlFor="">
                Status <sup>*</sup>
              </label>
              <input
                type="text"
                name="status"
                placeholder="Enter status"
                value={updatedData.status}
                onChange={updateDataHandler}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

