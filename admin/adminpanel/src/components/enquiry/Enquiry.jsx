import React, { useEffect, useState } from 'react'
import enquaryStyle from "./enquiry.module.css"
import { MdPendingActions, MdOutlineFreeCancellation } from 'react-icons/md';
import { MdOutlineConfirmationNumber, MdOutlineToday } from 'react-icons/md';
import { BiWallet } from 'react-icons/bi';
import { RiRadioButtonLine } from 'react-icons/ri';


import { Button, Input, Pagination, Spin } from 'antd';
const { TextArea } = Input;
import axios from "axios"
import moment from "moment"
const Enquiry = () => {
  const [enquiryData, setEnquiryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totol, setTotal] = useState("");
  const [pageSize, setPageSize] = useState(5);

  const [loading, setLoading] = useState(false)
  const getEquiryData = () => {
    setLoading(true)
    axios.get(`https://dearmschool.com/api/enquairy/alldata`).then((res) => {
      setEnquiryData(res.data)
      setTotal(res.data.length);
      setLoading(false)
    }).catch((err) => {
      throw err,
      setLoading(false)
    })
  }


  useEffect(() => {
    getEquiryData()
      ;
  }, [])

  // const endIndex = currentPage + pageSize;
  //   const startIndex = endIndex - pageSize;
  //   const displayedData = enquiryData.slice(startIndex, endIndex);
  //    console.log(displayedData)

  const enquiryDeleteHandler = (id) => {

    axios.delete(`https://dearmschool.com/enquairy/${id}`).then((res) => {

      getEquiryData()
    }).catch((err) => {
      throw err

    })
  }

  // today enquiry

  const todayEnquiry = enquiryData.filter((item) => {
    const todData = moment(item.createdAt).format("DD/MM/YYYY") === moment(new Date()).format("DD/MM/YYYY")
    return todData;
  })

  // total confirm

  const totalConfirm = enquiryData.filter((item) => {
    const todData = item.status === "complete"
    return todData;
  })

  //  total pending

  const TotalPending = enquiryData.filter((item) => {
    const todData = item.status === "pending"
    return todData;
  })


  // today confirmation

  const TodayConfirmEnquiry = enquiryData.filter((item) => {
    const todData = moment(item.createdAt).format("DD/MM/YYYY") === moment(new Date()).format("DD/MM/YYYY") && item.status === "complete";

    return todData;
  })

  // today pending
  const TodayPendingEnquiry = enquiryData.filter((item) => {
    const todData = moment(item.createdAt).format("DD/MM/YYYY") === moment(new Date()).format("DD/MM/YYYY") && item.status === "pending";

    return todData;
  })
  console.log("pending", TodayPendingEnquiry);

const newDate =moment(new Date()).format("DD/MM/YYYY");



  // Calculate the index range of the items to display on the current page
  const lastIndex = (currentPage-0)*pageSize;
  const firstIndex = lastIndex-pageSize;
  const data = enquiryData.slice(firstIndex,lastIndex)

  return (
    <div className={enquaryStyle.enuiryDiv}>
      <div className={enquaryStyle.enuiryHeadDetels} >
        <div>
          <p style={{ color: "red" }}>Total Enquiry</p>
          <section>



            <BiWallet size={40} color='red' />
            <p style={{ color: "red" }}>{enquiryData.length}</p>
          </section>

        </div>
        <div>
          <p style={{ color: "yellow" }}> Today Enquiry</p>
          <section>
            <MdOutlineToday size={40} color='yellow' />
            <p style={{ color: "yellow" }}>{todayEnquiry.length}</p>
          </section>

        </div>

        <div>
          <p style={{ color: "lightgreen" }}> Today Confirm</p>
          <section>
            <MdOutlineFreeCancellation size={40} color='lightgreen' />
            <p style={{ color: "lightgreen" }}>{TodayConfirmEnquiry.length}</p>
          </section>

        </div>



        <div>
          <p style={{ color: "#D9512C" }}> Today Pending </p>
          <section>
            <MdPendingActions size={37} color='#D9512C' />
            <p style={{ color: "#D9512C" }}>{TodayPendingEnquiry.length}</p>
          </section>

        </div>


        <div>
          <p style={{ color: "lightgreen" }}> Total Confirm </p>
          <section>
            <MdOutlineConfirmationNumber color='lightgreen' size={40} />
            <p style={{ color: "lightgreen" }}>{totalConfirm.length}</p>
          </section>

        </div>
        <div>

          <p style={{ color: "#D9512C" }}> Total Pending </p>
          <section>
            <MdPendingActions size={37} color='#D9512C' />
            <p style={{ color: "#D9512C" }}>{TotalPending.length}</p>
          </section>

        </div>



      </div>
      <div style={{ textAlign: 'center', width: "100%", display: "flex", justifyContent: "end", padding: "8px 20px" }}>
        <Button type="primary" onClick={() => getEquiryData()}>Refresh</Button>
      </div>
      <div className={enquaryStyle.mainTableContairs} >
        {(loading)? <div style={{height:"59vh" ,width:"100%",display:"flex" ,justifyContent:"center",alignItems:"center"}}><Spin size='large'/></div>:
        <table border={0} cellSpacing={0} cellPadding={0} >
          <thead >
            <th>Date</th>
            <th>Name</th>
            <th>Phone</th>
            <th>massage</th>

            <th>status</th>
            <th>Delete</th>
          </thead>
          <tbody >
            {
              data.map((data) => (
                <tr>
                  <td style={{color:(moment(data.createdAt).format("DD/MM/YYYY")===newDate)&&"red"}} >{moment(data.createdAt).format("DD/MM/YYYY")}</td>
                  <td style={{ textTransform: "capitalize" }}>{data.name}</td>

                  <td>{data.number}</td>
                  <td>
                    <textarea style={{ borderRadius: "4px", padding: "3px", width: "100%" }} value={data.massage} />
                  </td>

                  <td >
                    <div style={{ display: 'flex', justifyContent: "center", gap: "10px", alignItems: "center" }}>
                      <RiRadioButtonLine color={(data.status === "pending" ? "#D9512C" : "lightgreen")} size={20} /> <span style={{ textTransform: "capitalize" }}>{data.status}</span>
                    </div>
                  </td>
                  <td>
                    <Button type="primary" danger onClick={() => enquiryDeleteHandler(data._id)}>Delete</Button>
                  </td>
                </tr>
              ))
            }


          </tbody>
        </table>
}
      </div>

      <div style={{ display: "flex", justifyContent: "end", paddingRight: "30px" }}>
        <Pagination 

          total={totol}
         
            pageSize={pageSize}
            current={currentPage}

            onChange={(value)=>setCurrentPage(value)}
      />

      </div>
    </div>
  )
}

export default Enquiry