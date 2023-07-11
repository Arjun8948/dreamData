// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'
// import showStyle from "../../css/blog/showBlog.module.css"
// import Footer from '../footer/Footer';
// import { Avatar } from 'antd';
// import {useSelector} from "react-redux"
// const ShowPost = () => {
//   const [data, setData] = useState([])
//   const current = useLocation().pathname.split('/')[2];
//   const {currentStudent} =useSelector((state)=>state.student)

//   useEffect(() => {
//     axios.get(`http://localhost:8080/api/post/${current}`)
//       .then((res) => setData(res.data.data))
//       .catch((err) => console.log(err.response.data))
//   }, [])




//   return (
//     <div className={showStyle.showblogSection}>
//       <div className={showStyle.nav}>
//         <div>

//           <p>Read - Blog - artical</p>
         

//         </div>
//         <div id='gothome'>
//         <a href="/"><span> Go To Home </span></a>
//         <span>-</span>
//         <a href="/blog"><span> Go To Blog </span></a>
//         </div>
//       </div>
//       <div className={showStyle.showBlogContenar}>
//         <div className={showStyle.showPost}>
//           <div className={showStyle.postView}>
//             <div className={showStyle.postViewImg}>
//         <img src={data?.image} alt="" />
//             </div>
//             <div className={showStyle.postViewTitle}>
//                {data?.title}
//             </div>
//             <div className={showStyle.postViewartical}>
//             {data?.artical}
//             </div>
//           </div>
//           <div className={showStyle.recenltPost}>
//           <div>
//             <div>
//              <Avatar size={'large'}/>
//           <span className={showStyle.name}>Name</span>
//             </div>
//             <div className={showStyle.Comment}>
//             <input type="text" placeholder='add comment...' />
//             <button>sent</button>
//             </div>
//           </div>
//           <hr style={{margin:"20px 50px"}} />
//           {/* =========== */}
//           <div className={showStyle.getComment}>
//           <div >
//              <Avatar size={'large'}/>
//            <span className={showStyle.name}>Name</span>
//             </div>
//             <div className={showStyle.Comment}>
//            <textarea disabled   cols="20" rows="2" style={{width:"95%",textAlign:'justify'}}></textarea>
//             </div>
//             </div>
//             {/*  */}
//             <div className={showStyle.getComment}>
//           <div  >
//              <Avatar size={'large'}  />
//            <span className={showStyle.name}>Name</span>
//             </div>
//             <div className={showStyle.Comment}>
//            <textarea disabled   cols="20" rows="2" style={{width:"95%",textAlign:'justify'}}></textarea>
//             </div>
//             </div>
            
//             {/* ================ */}
//           </div>
      
//         </div>
//         <div lassName={showStyle.footer}>
//         <Footer />
//         </div>
      
//       </div>
//     </div>
//   )
// }

// export default ShowPost



