import React, { useState } from "react";
import featureStyle from "./feature.module.css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Button, Modal, notification, Progress, Table } from "antd";
import axios from "axios";
import { useEffect } from "react";

const Feature = () => {
  const [featureData, setFeatureData] = useState([]);
  const [loading,setLoading] =useState(false)
  const [massage, setMassge] = notification.useNotification();



const getFreature=()=>{
  setLoading(true)
  axios.get(`https://dearmschool.com/api/getfeature`).then((res)=>{
    setFeatureData(res.data)
    setLoading(false)
  }).catch((err)=>{
    throw err;
  })
}

useEffect(()=>{
  getFreature()
},[])


  const deleteHandler =(id)=>{
    axios.delete(`https://dearmschool.com/api/deletefeature?id=${id}`).then((res)=>{
      massage.success({
        message: `Feature Deletion Success`,
        description: `${res.data.massage}`,
        placement: "top",
      })
     getFreature()

    }).catch((err)=>{
      massage.error({
        message: `Feature Deletion field`,
        description: `${err.response.data.massage || "Internal Server Eroor"}`,
        placement: "top",
      });
    })
    getFreature()
  }
  const restult = featureData.map((item, ind) => {
    const data = {
      key: item.ind,
      no: ind+1,
      featureName:item.featureName,
      featureImg: <img src={item.imgUrl} height={170} width={'200px'} style={{borderRadius:"3px"}}/>,
      detete: < Button type="primary"  onClick={() => deleteHandler(`${item._id}`)} danger>Delete</Button>,
    }
    return data
  })

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Feature Name",
      dataIndex: "featureName",
      key: "featureName",
    },
    {
      title: "Feature Img",
      dataIndex: "featureImg",
      key: "featurImg",
    },

    {
      title: "Detete",
      dataIndex: "detete",
      key: "detete",
    },
  ];

  return (
    <div className={featureStyle.mainSection}>
      {setMassge}
      <div className={featureStyle.featureSection}>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={3}
          autoplay={true}
          pagination={{ clickable: true }}
    
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >{
          featureData.map((item)=>(
            <SwiperSlide  style={{height:'200px',textAlign:"center",backgroundColor:'#fff',borderRadius:"4px",border:'1px solid lightgray'}}>
          
              <img src={item.imgUrl} alt=""  width={"100%"}  height={"83%"} style={{borderRadius:"4px",border:'1px solid lightgray'}}  />
            <p  style={{backgroundColor:"#FFF",width:"100%",textAlign:"center",borderRadius:"2px",fontSize:"20px",fontStyle:"bold"}}>{item.featureName}</p> 
         
            
          </SwiperSlide>
          ))
       
         }
        </Swiper>
      
      </div>
      <div className={featureStyle.sectionBtn}>
        <Button type="primary" size="large" onClick={()=> getFreature()}>
          Refresh
        </Button>
        <AddFeature  getFreature={getFreature} />
      </div>

      <div className={featureStyle.sectionTable}>
        <Table loading={loading} dataSource={restult} columns={columns}  pagination={{pageSize:1}}/>;
      </div>
    </div>
  );
};

export default Feature;

const AddFeature = ({getFreature}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featureName, setFeatureName] = useState("");
  const [featureImg, setFeatureImg] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(null);
  const [massage, setMassge] = notification.useNotification();
  const [resetFile, setResetFile] = useState("file");
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (
      (featureName === null || featureName === "") &&
      (featureImg === null || featureImg === "")
    ) {
      massage.error({
        message: `Feature Name & Image Required`,
        description: `Please Enter Feature Name And Image`,
        placement: "top",
      });
      return false;
    }
    const formData = new FormData();
    formData.append("featureName", featureName);
    formData.append("featureImg", featureImg);
    setLoading(true);
    axios
      .post(`https://dearmschool.com/api/addfeature`, formData, {
        onUploadProgress: (data) => {
          const percents = Math.round((data.loaded * 100) / data.total);
          setUploadPercent(percents);
          console.log(percents);
        },
      })
      .then((res) => {
        massage.success({
          message: `Feature Upload Success`,
          description: `${res.data.massage}`,
          placement: "top",
        });
        setLoading(false);
      
      })
      .catch((err) => {
        massage.error({
          message: `Feature Upload Field`,
          description: `${
            err.response.data.massage || "Internal Server Error"
          }`,
          placement: "top",
        });
        setLoading(false);
     setUploadPercent(null);
        return false;
      });
      setResetFile("text")
   setTimeout(()=>{
         setFeatureName("")
  setResetFile("file")

     setUploadPercent(null)
     setFeatureImg(null)
     getFreature()
   },2000)

//    setUploadPercent(null)
//  setFeatureImg(null)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {setMassge}
      <Button type="primary" size={"large"} onClick={showModal}>
        Add Feature
      </Button>
      <Modal
        title="Dreams School Feature"
        open={isModalOpen}
        onOk={handleOk}
        okText={loading ? "Loading..." : "Upload now"}
        onCancel={handleCancel}
      >
        <div className={featureStyle.addfeaturediv}>
          <label htmlFor="">
            {" "}
            Feature name <sup>*</sup>
          </label>
          <input
            type="text"
            placeholder="Enter Feature Name..."
            value={featureName}
            onChange={(e) => setFeatureName(e.target.value)}
          />
        </div>

        <div className={featureStyle.addfeaturediv}>
          <label htmlFor="">
           Feature Img <sup>*</sup>
          </label>
          <input
            type={resetFile}
            name="featureImg"
            onChange={(e) => setFeatureImg(e.target.files[0])}
          />
        </div>

        {featureImg && (
          <div
            style={{
              height: "200px",
              padding: "10px 25px",
              marginBottom: "25px",
            }}
          >
            <img
              src={URL.createObjectURL(featureImg)}
              alt=""
              style={{ borderRadius: "5px" }}
              width="100%"
              height="100%"
            />
            {uploadPercent && <Progress percent={uploadPercent} />}
          </div>
        )}
      </Modal>
    </>
  );
};
