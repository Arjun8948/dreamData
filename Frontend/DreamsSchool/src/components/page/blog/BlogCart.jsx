// import React, { useEffect, useState } from 'react';
// import blogStyles from '../../css/blog/BlogCart.module.css';
// import girlImg from "../../../assets/educationgirl.png"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import {Spin} from  'antd'

// const BlogCard = ({loadMore,blogData}) => {
//   const navigate = useNavigate();

 
 

//   return (
//     <>
//     {

//     blogData.slice(0,loadMore).map((post)=>(
   
// <div className={blogStyles.blogContenar}>
 
//        <div className={blogStyles.blogImg}>
//          <img src={post.image} alt="" />
//        </div>
    
//        < div className={blogStyles.blogText}>
//         <div className={blogStyles.blogTitle}>
//         <span>{post.title}</span>
//        </div>
//         <p>
//           {`${post.artical.slice(0,260)}...`}
//           </p>

//        </div>
//         <div className={blogStyles.blogReadMore}>
//             <span onClick={()=>navigate(`/blog/${post._id}`)}>Read More</span> 
//           </div>
//     </div>

//     ))
   
  
//     }

//     </>
//   );
// };

// export default BlogCard;