import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ReviewStyle from '../../css/swiper/Review.module.css'
 import {Rate} from "antd"
import { SliderData } from '../SliderData';
import axios from "axios"
const Review = () => {
  const [reviewData,setReviewData]=useState([]);

  const [updatSlider, setUpdateSlider] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setUpdateSlider(window.innerWidth)
    }, 0)
  }, [updatSlider])
  
useEffect(()=>{
  axios.get("https://dearmschool.com/api/getreview").then((res)=>{
  setReviewData(res.data);
  }).catch((err)=>{
   throw err
  })
},[])



  return (

    <div className={ReviewStyle.mainContenar}>
      <div className={ReviewStyle.heading}>Review of Dreams School</div>
      <br />
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={40}
        slidesPerView={(updatSlider > 890) ? 3 : (updatSlider > 660) ? 2 : 1}
        autoplay={true}
        pagination={{ draggable: true }}

      >
        <br /> <br />
        {
          reviewData?.map((item) => (
            <SwiperSlide>
              <div className={ReviewStyle.contenar}>
                <div className={ReviewStyle.imageContenar}>
                  <img src={item.profileLogo} alt="" />
                  <h3>{item.name}</h3>
                  <span>{item.designation}</span>
                  <p>{item.massage}</p>
                  <div className={ReviewStyle.ratebyExport} >
                  <span> {"Rating" }  {item.rating} + </span>
                   <Rate allowHalf value={item.rating} className={ReviewStyle.Ratingsize}/>
               </div>
               </div>
              </div>
            </SwiperSlide>
          ))
        }

      </Swiper>

    </div>
  );
}

export default Review