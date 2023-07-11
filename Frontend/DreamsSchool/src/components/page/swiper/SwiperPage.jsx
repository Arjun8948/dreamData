import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import swiperStyle from '../../css/swiper/SwiperSlider.module.css'
import { Card } from 'antd';
import axios from "axios"

const SwiperPage = () => {
  const [featureData ,setFeatureData]=useState([]);
  const [updatSlider, setUpdateSlider] = useState(0);
  
  
  useEffect(() => {

      setInterval(() => {
      setUpdateSlider(window.innerWidth)
    }, 0)
  }, [updatSlider])

useEffect(()=>{
  axios.get("https://dearmschool.com/api/getfeature").then((res)=>setFeatureData(res.data))
  .catch((err)=>{
    console.log(err);

  })
},[])

  return (

<div className={swiperStyle.mainContenar}>
      <div className={swiperStyle.heading}>Top Feature of Dreams School</div>
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
        featureData.map((item) => (
          <SwiperSlide> 
            <div className={swiperStyle.contenar}>
             < div className={swiperStyle.imageContenar}>
              <img src={item.imgUrl} alt="" />
             </div>
             < div className={swiperStyle.headtext}>
              <p style={{fontWeight:"800"}}>{item.featureName}</p>
             </div>
          </div> 
          </SwiperSlide>
        ))
      }

    </Swiper>
   
    </div>
  );
}

export default SwiperPage