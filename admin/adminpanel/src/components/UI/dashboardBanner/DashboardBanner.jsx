 

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
import bannerStyle from "./dashboardBanner.module.css";

const DashboardBanner = () => {
  const [dashboardBanner, setdasboardBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [massage, setMassge] = notification.useNotification();

  const getAdBanner = () => {
    setLoading(true);
    axios.get(`https://dearmschool.com/api/dashboardbanner/all`)
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

 
  const deleteHandler = (id) => {
    axios
      .delete(`https://dearmschool.com/api/dashboardbanner?id=${id}`)
      .then((res) => {
        massage.success({
          message: `Dashboard Banner Deletion Success`,
          description: `${res.data.massage}`,
          placement: "top",
        });
        getAdBanner();
      })
      .catch((err) => {
        massage.error({
          message: `Dashboard Ads Banner Deletion field`,
          description: `${
            err.response.data.massage || "Internal Server Eroor"
          }`,
          placement: "top",
        });
      });
      getAdBanner();
  };
  const restult = dashboardBanner.map((item, ind) => {
    const data = {
     
      no: ind+1,
      bannerImg:<img src={item.dashboardBanner} style={{borderRadius:"5px"}}/> ,
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
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: " Dashboard Banner Image",
      dataIndex: "bannerImg",
      key: "bannerImg",
    },

    {
      title: "Detete",
      dataIndex: "detete",
      key: "detete",
    },
  ];

  return (
    <div className={bannerStyle.mainSection}>
      {setMassge}
      <div className={bannerStyle.featureSection}>
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
                height: "185px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: "23px",
                textAlign: "center",
                
                flexDirection: "column",
              }}
            >
  
              <img src={item.dashboardBanner} alt=""  style={{height:"100%" ,width:"100%",borderRadius:"3px"}}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={bannerStyle.sectionBtn}>
        <Button type="primary" size="large" onClick={() => getAdBanner()}>
          Refresh
        </Button>
        <AddDashBoardBanner getAdBanner={getAdBanner} />
      </div>

      <div className={bannerStyle.sectionTable}>
        <Table
          loading={loading}
          dataSource={restult}
          columns={columns}
          pagination={{ pageSize: 1}}
        />
        ;
      </div>
    </div>
  );
};

export default DashboardBanner;

const AddDashBoardBanner = ({ getAdBanner }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [profileImg, setProfileImg] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(null);
  const [massage, setMassge] = notification.useNotification();
  const [resetFile, setResetFile] = useState("file");
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

 
  const handleOk = () => {
   
    const formData = new FormData();
    formData.append("dashboardBanner", profileImg);
  setLoading(true);
    axios
      .post(`https://dearmschool.com/api/dashboardbanner`, formData, {
        onUploadProgress: (data) => {
          const percents = Math.round((data.loaded * 100) / data.total);
          setUploadPercent(percents);
          console.log(percents);
        },
      })
      .then((res) => {
        massage.success({
          message: ` Dashboard Banner Ads Upload Success`,
          description: `${res.data.massage}`,
          placement: "top",
        });
        setLoading(false);
      })
      .catch((err) => {
        massage.error({
          message: `Dashboard Banner Ads Banner Field`,
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
 
      setUploadPercent(null);
      setProfileImg(null);
      getAdBanner();
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
        Add Banner
      </Button>
      <Modal
        title="Dreams School Banner Ads"
        open={isModalOpen}
        onOk={handleOk}
        okText={loading ? "Loading..." : "Upload now"}
        onCancel={handleCancel}
      >
         <div style={{display:"flex",flexDirection:"column"}}>
                <label htmlFor="">Banner Ads Image <sup>*</sup></label>
                <input style={InputStyle} type={resetFile} name="dashboardBanner" onChange={(e)=>setProfileImg(e.target.files[0])} />
               {
                profileImg && <div style={{height:"200px",width:"100%",margin:'10px 0px'}}>
                  <img src={URL.createObjectURL(profileImg)} height={"100%"} width={"100%"} style={{borderRadius:"5px"}} />
                </div> 
               }
              { uploadPercent && <Progress percent={uploadPercent} style={{margin:"0px 10px"}}/>}
              </div>
      
      </Modal>
    </>
  );
};



