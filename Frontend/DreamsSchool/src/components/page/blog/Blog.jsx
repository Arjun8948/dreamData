// import React, { useEffect, useState } from 'react'
// import Navber from '../navber/Navber'
// import blogStyle from "../../css/blog/BlogPage.module.css"
//  import BlogCard from "./BlogCart"
// import  Footer  from '../footer/Footer'
// import axios from "axios"
 

// const Blog = () => {
//   const [loadMore,setLodeMore]=useState(3)
   
//   const [blogData,setBlogData]=useState([]);
//   const [searchInput,setSearchInput]=useState("");

//  const Loadmore =()=>{
//     setLodeMore((pre)=>pre+3)
//     }

//  useEffect(()=>{
//     axios.get("http://localhost:8080/api/allpost")
//     .then((res)=>{setBlogData(res.data)
//     console.log(res.data)
//     })
//     .catch((err)=>console.log(err.response.data))
//   },[loadMore,searchInput])

//   const searchBlog =()=>{
//      const data = blogData.filter((item,index)=>{
//       if(searchInput===""){
//        return blogData;
//       }else{
//        return (item.title.toLowerCase().includes(searchInput.toLowerCase()))
//       }
  
//      })
   
//      setBlogData(data)
    
//   }

// return (
//     <div className={blogStyle.blogSection}>
//       <div className={blogStyle.nav} >
//         <Navber />
//       </div>
//       <div className={blogStyle.blogContaner} >
//         <div className={blogStyle.blogStyleSubContaner}>
//         <div className={blogStyle.blogStyleSearchBox}>
//              <div>
//               <input type="text"  placeholder='Search...' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}  />
//               <button onClick={searchBlog}>Search</button>
//              </div>

//           </div>
//           {/* ==========================card=================== */}
//           <div  className={blogStyle.blogStylePostBox}>
          
//             <BlogCard loadMore={loadMore} blogData={blogData} />
//           </div>
//           <div className={blogStyle.lodemore}>
//             <span onClick={Loadmore}> Load More</span>
//           </div>
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   )
// }

// export default Blog