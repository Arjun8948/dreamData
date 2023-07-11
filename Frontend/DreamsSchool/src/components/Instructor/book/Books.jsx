import React, { useEffect, useState } from 'react'
import {Button,Table} from "antd"
import axios from 'axios'
import pdfImg from "../../../assets/pdf.png"
const columns = [
  {
    title: 'Class Name',
    dataIndex: 'className',
    key: 'className',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'File',
    dataIndex: 'file',
    key: 'file',
  },
  {
    title: 'Download',
    dataIndex: 'download',
    key: 'download',
  },
];
 

const Books = () => {
const [loading,setLoading] = useState(false)
const [bookData,setBookData] =useState([])
 


  const getBookData = async()=>{
    setLoading(true)
     const result = await axios.get("https://dreamsachool-y2s8.onrender.com/api/getBooks");
      setBookData(result.data)
      setLoading(false)

  }

  useEffect(()=>{
    getBookData();
  },[])
 
  const tableDate = bookData.map((item)=>{
    const data={
     className:item.className,
     subject:item.subjectName,
     file:<img src={pdfImg} width={"35"} height={"35"}/>,
     download:<a  href={item.books}  target="_black" download={true} >
      <Button type='primary' danger>Download</Button>
     </a>
    }
    return data;
  })

  return (
    <div style={{height:"100%" ,width:"100%"}}>
    <div style={{textAlign:"end",margin:"10px 0px",backgroundColor:"#001529",padding:"8px",borderRadius:"5px"}}>
    
    <Button type='primary' onClick={()=> getBookData()}>Refresh</Button>
    </div>
    <div  >
      <Table  columns={columns} loading={loading} pagination={{pageSize:3}} dataSource={tableDate}/>

     
    </div>

    </div>
  )
}

export default Books





