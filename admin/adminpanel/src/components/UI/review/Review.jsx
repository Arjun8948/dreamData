import React, { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Button,
  Modal,
  Avatar,
  Rate,
  notification,
  Progress,
  Table,
} from "antd";
import axios from "axios";
import { useEffect } from "react";
import reviewStyle from "./review.module.css";
const Review = () => {
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [massage, setMassge] = notification.useNotification();

  const getReview = () => {
    setLoading(true);
    axios
      .get(`https://dearmschool.com/api/getreview`)
      .then((res) => {
        setReviewData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getReview();
  }, []);

  const deleteHandler = (id) => {
    axios
      .delete(`https://dearmschool.com/api/review?id=${id}`)
      .then((res) => {
        massage.success({
          message: `Review Deletion Success`,
          description: `${res.data.massage}`,
          placement: "top",
        });
      })
      .catch((err) => {
        massage.error({
          message: `Review Deletion field`,
          description: `${
            err.response.data.massage || "Internal Server Eroor"
          }`,
          placement: "top",
        });
      });
    getReview();
  };
  const restult = reviewData.map((item, ind) => {
    const data = {
      name: (
        <>
          <Avatar src={item.profileLogo} /> {item.name}
        </>
      ),
      designation: item.designation,
      massage: item.massage,
      rating: item.rating,
      detete: (
        <Button
          type="primary"
          onClick={() => deleteHandler(`${item._id}`)}
          danger
        >
          Delete
        </Button>
      ),
    };
    return data;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Message",
      dataIndex: "massage",
      key: "massage",
    },

    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },

    {
      title: "Detete",
      dataIndex: "detete",
      key: "detete",
    },
  ];

  return (
    <div className={reviewStyle.mainSection}>
      {setMassge}
      <div className={reviewStyle.featureSection}>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={3}
          autoplay={true}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {reviewData.map((item) => (
            <SwiperSlide
              style={{
                height: "auto",
                textAlign: "center",
                backgroundColor: "#fff",
                borderRadius: "4px",
                border: "1px solid lightgray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: "23px",
              
                padding: "10px 0px",
                flexDirection: "column",
              }}
            >
              <Avatar size={55} src={item.profileLogo} />
              <p style={{ fontSize: "14px", margin: "2px 0px" }}>{item.name}</p>
              <p style={{ fontSize: "14px", margin: "0px 0px" }}>
                {item.designation}
              </p>
              <p style={{ fontSize: "14px" }}>{item.massage}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0px 20px",
                }}
              >
                <span style={{ fontSize: "14px" }}>Rating {item.rating}+ </span>
                <span>
                  <Rate
                    style={{ fontSize: "10px" }}
                    defaultValue={item.rating}
                  />
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={reviewStyle.sectionBtn}>
        <Button type="primary" size="large" onClick={() => getReview()}>
          Refresh
        </Button>
        <AddReview getReview={getReview} />
      </div>

      <div className={reviewStyle.sectionTable}>
        <Table
          loading={loading}
          dataSource={restult}
          columns={columns}
          pagination={{ pageSize: 3}}
        />
        ;
      </div>
    </div>
  );
};

export default Review;

const AddReview = ({ getReview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    name:"",
    designation:"",
    massage:"",
    rating:""
  });
  const [profileImg, setProfileImg] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(null);
  const [massage, setMassge] = notification.useNotification();
  const [resetFile, setResetFile] = useState("file");
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const reviewInputHandler = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOk = () => {
   
    const formData = new FormData();
    formData.append("name", reviewData.massage);
    formData.append("designation", reviewData.designation);
    formData.append("massage", reviewData.massage);
    formData.append("rating", reviewData.rating);
    formData.append("profileImg", profileImg);


    setLoading(true);
    axios
      .post(`https://dearmschool.com/api/addreview`, formData, {
        onUploadProgress: (data) => {
          const percents = Math.round((data.loaded * 100) / data.total);
          setUploadPercent(percents);
          console.log(percents);
        },
      })
      .then((res) => {
        massage.success({
          message: `Review Upload Success`,
          description: `${res.data.massage}`,
          placement: "top",
        });
        setLoading(false);
      })
      .catch((err) => {
        massage.error({
          message: `Review Upload Field`,
          description: `${
            err.response.data.massage || "Internal Server Error"
          }`,
          placement: "top",
        });
        setLoading(false);
        setUploadPercent(null);
        return false;
      });
    setResetFile("text");
    setTimeout(() => {
       
      setResetFile("file");
setReviewData({
  name:"",
  designation:"",
  massage:"",
  rating:""
})
      setUploadPercent(null);
      setProfileImg(null);
      getReview();
    }, 2000);

    //    setUploadPercent(null)
    //  setFeatureImg(null)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

const InputStyle ={
    width:"100%",
    outline:"none",
    border:"0.3px solid lightgray",
    padding:'6px',
    borderRadius:'3px'
}

  return (
    <>
      {setMassge}
      <Button type="primary" size={"large"} onClick={showModal}>
        Add Review
      </Button>
      <Modal
        title="Dreams School Review"
        open={isModalOpen}
        onOk={handleOk}
        okText={loading ? "Loading..." : "Upload now"}
        onCancel={handleCancel}
      >
        <div >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 14px",
              
            }}
          >
            <div style={{display:"flex",flexDirection:"column"}}>
              <label htmlFor="">
                Name<sup>*</sup>
              </label>
              <input style={InputStyle}
                type="text"
                name="name"
                placeholder="Enter name..."
                value={reviewData.name}
                onChange={reviewInputHandler}
              />
            </div>

            <div style={{display:"flex",flexDirection:"column"}}>
              <label htmlFor="">
                designation<sup>*</sup>
              </label>
              <input
            style={InputStyle}
                type="text"
                name="designation"
                placeholder="Enter designation..."
                value={reviewData.designation}
                onChange={reviewInputHandler}
              />
            </div>
            </div>
            <div  style={{display:"flex",flexDirection:"column",  padding: "5px 14px",}} >
              <label htmlFor="">
                Message <sup>*</sup>
              </label>
              <textarea style={{borderRadius:"3px",padding:'8px',
              outline:"none",
              width:"100%"}} name="massage" placeholder="Enter review message" cols="20" rows="5" value={reviewData.massage} onChange={reviewInputHandler}></textarea>
            </div>

            <div  style={{display:"flex" ,justifyContent:"space-between",padding:"0px 14px"}}  >
              <div style={{display:"flex",flexDirection:"column"}}>
                <label htmlFor="">Profile Image <sup>*</sup></label>
                <input style={InputStyle} type={resetFile} name="profileImg" onChange={(e)=>setProfileImg(e.target.files[0])} />
              { uploadPercent && <Progress percent={uploadPercent} style={{margin:"0px 10px"}}/>}
              </div>
              <div style={{display:"flex",flexDirection:"column"}}>
                <label htmlFor="">Rating <sup>*</sup></label>
                <input style={{width:'100px',padding:"7px",outline:'none' ,borderRadius:"3px", border:"0.3px solid lightgray"}} type="number" max={5} min={0} name="rating" placeholder="Enter rating point" value={reviewData.rating} onChange={reviewInputHandler} />
              </div>
            </div>
          </div>
        
      </Modal>
    </>
  );
};



