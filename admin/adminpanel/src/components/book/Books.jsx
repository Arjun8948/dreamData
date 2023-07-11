import React, { useEffect, useState } from "react";
import bookStyle from "./bookpage.module.css";
import { Button, Modal, Table, notification } from "antd";
import axios from "axios";
import pdfImg from "../../assets/pdf.png";
import { SiGoogleclassroom } from "react-icons/si";

const columns = [
  {
    title: "Class Name",
    dataIndex: "className",
    key: "className",
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "File",
    dataIndex: "file",
    key: "file",
  },
  {
    title: "Download",
    dataIndex: "download",
    key: "download",
  },
  {
    title: "Delete",
    dataIndex: "delete",
    key: "delete",
  },
  

];

const Books = () => {
  const [loading, setLoading] = useState(false);
  const [booksData, setBookData] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const getBookData = async () => {
    setLoading(true);
    const result = await axios.get(`https://dearmschool.com/api/getBooks`);
    setBookData(result.data);
    setLoading(false);
  };


  useEffect(() => {
    getBookData();
  }, []);

  const deteteBookHandler =(id)=>{
   
    axios.delete(`https://dearmschool.com/api/deleteBooks?id=${id}`).then((res)=>{
      api.success({
        message: `Book Deletion success`,
        description: res.data.massage,
        placement: "top",
      });
      getBookData();
 
    }).catch((err)=>{
      api.error({
        message: `Book Deletion fields`,
        description: `${err.response.data.massage||"Internal server error"}`,
        placement: "top",
      });
      getBookData();

      return false;
    })
    getBookData();
  }

  const Class9th = booksData.filter((res) => {
    const data =  (res.className.toLowerCase()) === "class 9";

    return data;
  });

  const Class10th = booksData.filter((res) => {
    const data =  (res.className.toLowerCase()) === "class 10";

    return data;
  });

  const Class11th = booksData.filter((res) => {
    const data = (res.className.toLowerCase()) === "class 11";

    return data;
  });

  const Class12th = booksData.filter((res) => {
    const data =  (res.className.toLowerCase()) === "class 12";

    return data;
  });

  const tableDate = booksData.map((item) => {
    const data = {
      className: item.className,
      subject: item.subjectName,
      file: <img src={pdfImg} width={"35"} height={"35"} />,
      download: (
        <a href={item.books} target="_black" download={true}>
          <Button type="primary" >
            Download
          </Button>
        </a>

      ),
      delete:<Button type="primary"
       danger onClick={()=>deteteBookHandler(item._id)}>Delete</Button>,

    };
    return data;
  });

  return (
    <div className={bookStyle.bookMainDiv}>
      {contextHolder}
      <div className={bookStyle.bookInfo}>
        <div style={{backgroundColor:"#FBE3E2"}}>
          <span style={{ fontSize: "18px", fontWeight: 600 }}>Total Books</span>
          <div className={bookStyle.bookcartInfo}>
            <img src={pdfImg} alt="" width={35} height={35} />
            <span style={{ fontSize: "18px", fontWeight: 600 }}>
              {booksData.length}
            </span>
          </div>
        </div>

        <div style={{backgroundColor:"#1677FF"}}>
          <span style={{ fontSize: "17px", fontWeight: 600 }}> Class 9</span>
          <div className={bookStyle.bookcartInfo}>
            <img src={pdfImg} alt="" width={35} height={35} />

            <span style={{ fontSize: "18px", fontWeight: 600 }}>
              {Class9th.length}
            </span>
          </div>
        </div>
        <div style={{backgroundColor:"yellow"}}>
          <span style={{ fontSize: "17px", fontWeight: 600 }}> Class 10</span>
          <div className={bookStyle.bookcartInfo}>
            <img src={pdfImg} alt="" width={35} height={35} />

            <span style={{ fontSize: "18px", fontWeight: 600 }}>
              {Class10th.length}
            </span>
          </div>
        </div>

        <div style={{backgroundColor:"#FF4D4F"}}>
          <span style={{ fontSize: "17px", fontWeight: 600 }}> Class 11</span>
          <div className={bookStyle.bookcartInfo}>
            <img src={pdfImg} alt="" width={35} height={35} />

            <span style={{ fontSize: "18px", fontWeight: 600 }}>
              {Class11th.length}
            </span>
          </div>
        </div>
        <div style={{backgroundColor:"lightgreen"}}>
          <span style={{ fontSize: "17px", fontWeight: 600 }}> Class 12</span>
          <div className={bookStyle.bookcartInfo}>
            <img src={pdfImg} alt="" width={35} height={35} />

            <span style={{ fontSize: "18px", fontWeight: 600 }}>
              {Class12th.length}
            </span>
          </div>
        </div>
      </div>
      <div className={bookStyle.bookAddbtn}>
        <Button type="primary" onClick={getBookData}>
          Refresh
        </Button>
        <AddBooks/>
      </div>
      <div className={bookStyle.bookTable}>
        <Table
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 3 }}
          dataSource={tableDate}
        />
      </div>
    </div>
  );
};

export default Books;

const AddBooks = () => {
  const [api, contextHolder] = notification.useNotification();
  const [addBook, setAddBook] = useState({
    className: "",
    subjectName: "",
  });
  const [file, setFile] = useState(null);
  const [resetFile,setResetFile] = useState("file")

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

   

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addBookInputHandler=(e)=>{
    setAddBook({
      ...addBook,[e.target.name]:e.target.value
    })
  }

  const handleOk = () => {
    console.log(addBook);
    if (addBook.className === "" || addBook.className === null) {
      api.error({
        message: `Class name fields`,
        description: `Please enter class name`,
        placement: "top",
      });
      return false;
    }

    if (addBook.subject === "" || addBook.subject === null) {
      api.error({
        message: `Subject name fields`,
        description: `Please enter subject name`,
        placement: "top",
      });
      return false;
    }

    if (file === null || file === "") {
      api.error({
        message: `Book file fields`,
        description: `Please choose book file`,
        placement: "top",
      });
      return false;
    }

    const formData = new FormData();
    formData.append("className",addBook.className)
    formData.append("subjectName",addBook.subjectName)
    formData.append("books",file)

    axios.post(`https://dearmschool.com/api/addBooks`,formData).then((res)=>{
      api.success({
        message: `Book upload success`,
        description: res.data.massage,
        placement: "top",
      });
   
      return false;
    }).catch((err)=>{
      api.error({
        message: `Book upload fields`,
        description: `${err.response.data.massage||"Internal server error"}`,
        placement: "top",
      });
      return false;
    })
  setResetFile("text")
setTimeout(()=>{

  setResetFile("file")
  setAddBook({
    className:"",
    subjectName:""
  })
},0)

  };

  return (
    <>
      {contextHolder}
      <Button  type="primary" onClick={showModal}>Add Book</Button>
        <Modal title="Add new book model" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <div className={bookStyle.formDatas}>
        <label htmlFor="">Class Name <sup>*</sup></label>
       <input type="text" placeholder="Enter Class name" 
       name="className"
       value={addBook.className} onChange={addBookInputHandler} />
       </div>

       <div  className={bookStyle.formDatas}>
        <label htmlFor="">Subject Name <sup>*</sup></label>
       <input type="text" placeholder="Enter subject name" 
       name="subjectName"
       value={addBook.subjectName} onChange={addBookInputHandler}/>
       </div>
       
       <div  className={bookStyle.formDatas}>
        <label htmlFor="">Books file<sup>*</sup></label>
        <input type={resetFile} name="books" onChange={(e)=>setFile(e.target.files[0])}/>
       </div>
       
       
       
      </Modal>
    </>
  );
};
