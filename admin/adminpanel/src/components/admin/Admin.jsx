import React, { useEffect, useState } from 'react'
import subadminStyle from "./Subadmin.module.css"
import { Button, Input, Modal, Progress, Spin, Table, notification } from 'antd'
import {
  BsPersonFillAdd, BsFillPersonVcardFill
  , BsPersonGear, BsPersonWorkspace
} from 'react-icons/bs'
import { FaSearchengin, FaPlaystation } from 'react-icons/fa'
import { MdOutlinePersonAddAlt } from 'react-icons/md'
// const [updateDate,setUpdate]= useState({})
import addAdminStyle from "./addAdmin.module.css"
import { useSelector } from 'react-redux'
import axios from 'axios'
import Addadmin from './Addadmin'
import moment from "moment"



const Admin = () => {
  const admin = useSelector((state) => state.currentAdmin)
  const [api, contextHolder] = notification.useNotification();
  const [adminDatas, setAdminData] = useState([]);
  const [loading, setLoding] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [tableData, setTableData] = useState([])
  
  const getAdminData = () => {
    setLoding(true)
    axios.get(`https://dearmschool.com/api/getadmin`).then((res) => {
      setAdminData(res.data.admin)
      setTimeout(() => {
        setLoding(false)
      }, 0)

    }).catch((err) => { throw err,setLoding(false) })
  }


  useEffect(() => {
    getAdminData()
  }, [])

 

  const deleteHandler = (ind) => {
    axios.delete(`https://dearmschool.com/api/admin/delete?id=${ind}`).then((res) => {
      api.success({
        message: `Admin Deletion Success`,
        description: `${res.data.massage}`,
        placement: "top",
      });
      getAdminData()
    }).catch((err) => {
      api.error({
        message: `Admin Deletion Field`,
        description: `${err.response.data.massage || "Internal Sever Error"}`,
        placement: "top",
      });
    })

  }

  const restult = adminDatas.map((item, ind) => {
    const data = {
      key: item.ind,
      id: item._id,
      name: item.name,
      phone: item.phone,
      state: item.state,
      joining:moment(item.joining).format("DD/MM/YYYY"),
      type: item.adminType,
      update: < p >
        <UpdateAdminModel  id={item._id}  name={item.name} 
        email={item.email} phone={item.phone} state={item.state} type={item.adminType}
        joining={item.joining}
        getAdminData={getAdminData} />
      </p>,
      delete: < Button type="primary" disabled={(admin?.adminType !== "root") ? true : false} onClick={() => deleteHandler(`${item._id}`)} danger>Delete</Button>,
    }
    return data
  })


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Joining ',
      dataIndex: 'joining',
      key: 'joining',
    },

    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Update',
      dataIndex: 'update',
      key: 'update',
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
    },
  ];


  const rootAdminCount = adminDatas.filter((item) => {
    const rootAdmin = item.adminType === 'root'
    return rootAdmin;
  })

  const subAdminCount = adminDatas.filter((item) => {
    const subAdmin = item.adminType === 'sub'
    return subAdmin;
  })

  const subAdminState = [...new Set(adminDatas.map(item => item.state))]; // [ 'A', 'B']


  const SearchDataHandler = () => {
    if (searchInput === "" || searchInput == null) {
      setTableData(restult)
    }
    else {
      const newData = restult.filter((item) => {
        return item.name.toUpperCase().includes(searchInput.toUpperCase())
      })
      setTableData(newData)
    }
  }


  return (
    <>
      {contextHolder}
     

          <div className={subadminStyle.adminContenars}>
            <div className={subadminStyle.adminStatics}>
              <div>
                <h3>Total Admin   </h3>
                <section>
                  <BsFillPersonVcardFill color="lightgreen" size={35} />
                  <p>{adminDatas.length}</p>
                </section>
              </div>
              {/* ========================================== */}
              <div>
                <h3>Root Admin</h3>
                <section>
                  <BsPersonGear color="lightgreen" size={33} />
                  <p>{rootAdminCount.length}</p>
                </section>
              </div>
              {/* ========================================================= */}

              <div>
                <h3>Sub Admin</h3>
                <section>
                  <MdOutlinePersonAddAlt color="lightgreen" size={35} />
                  <p >{subAdminCount.length}</p>
                </section>
              </div>
              {/* =============================================== */}
              <div>
                <h3>Total State</h3>
                <section>
                  <FaPlaystation color="lightgreen" size={35} />
                  <p>{subAdminState.length}</p>
                </section>
              </div>

              {/* ================================================ */}



            </div>
            <div className={subadminStyle.adminnew}>
              <div className={subadminStyle.searchadmin}>
                <input type="text" placeholder='Search admin...' onChange={(e) => {
                  setSearchInput(e.target.value)
                  SearchDataHandler()
                }} />
                <p onClick={SearchDataHandler} disabled='true' ><FaSearchengin size={18} /></p>
              </div>
              <button disabled={(admin?.adminType !== "root") ? true : false}
              > <Addadmin /></button>
            </div>
            <div className={subadminStyle.adminTable}>
            {
        (loading) ?
          <div style={{ height: '59Vh', width: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Spin size={'large'} />
          </div>



          :
       
              <Table style={{height:"59vh"}} dataSource={searchInput ? tableData : restult} columns={columns} pagination={{
                currentPage: 1,
                total: restult.lenght + 8,
                pageSize: 4,
                color: "#fff"
              }}
              />
              
            }
            </div>
          </div>
    
    </>
  )
}

export default Admin





const UpdateAdminModel = ({id,name,email,type,state,phone,joining,getAdminData}) => {
  const [api, contextHolder] = notification.useNotification();
     const admin = useSelector((state)=>state.currentAdmin)
  const [adminProfile, setAdminProfile] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resetFile, setFile] = useState('file')
  const [adminData, setAdminData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    adminType: "",
    state: "",
    joining:""

  })
  useEffect(()=>{
    setAdminData({
      id: id,
      name: name,
      email: email,
      phone: phone,
      adminType: type,
      state: state,
      joining:joining
  
    })
  },[id])
 

  const adminInput = (e) => {
    setAdminData({
      ...adminData, [e.target.name]: e.target.value
    })
  }


  const handleOk = () => {
    const formData = new FormData();
    formData.append("id", adminData.id)
    formData.append("name", adminData.name)
    formData.append("email", adminData.email)
    formData.append("phone", adminData.phone)
    formData.append("adminType", adminData.adminType)
    formData.append("state", adminData.state)
    formData.append("joining", adminData.joining)

    formData.append("adminImg", adminProfile)
    // setLoading(true)

    axios.put(`https://dearmschool.com/api/admin/update`, formData, {
      onUploadProgress: (event) => {
        const Progessdata = (Math.round((event.loaded * 100) / event.total))
        setProgress(Progessdata)
      },
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      setLoading(false)
      api.success({
        message: `Admin  Update Success`,
        description: `${res.data.massage}`,
        placement: 'top'
      });


    }).catch((err) => {
      api.error({
        message: `Admin Update Field`,
        description: `${err.response.data.massage || "Internal Server Error"}`,
        placement: 'top'
      });
      setLoading(false)
      return false;
    })
    setAdminData({
      name: "",
      email: "",
      phone: "",
      adminType: "",
      state: "",
      joining: ""

    })

    setFile('text')
    setAdminProfile(null)

    setTimeout(() => {
      setFile('file')
      // setIsModalOpen(false);
      getAdminData()
    }, 1000)

  }

  const showModal = () => {
    setIsModalOpen(true);
  }




  const handleCancel = () => {
    setIsModalOpen(false);
  }


  return (
    <>
    {contextHolder}
      <Button  type='primary' onClick={showModal} disabled={ (admin?.adminType !== "root")?true:false}>Update</Button>
      <Modal title="New Deteils Update" width={500} style={{ color: "balck" }}
        open={isModalOpen} okText={(loading) ? "Loading.." : "Update "} onOk={handleOk} onCancel={handleCancel}>
        <div className={addAdminStyle.div}>
          <div className={addAdminStyle.subdiv}>
            <div>
              <section>
                <label htmlFor="">Name <sup>*</sup></label> <br />
                <input type="text" name='name' placeholder='Enter admin name' onChange={adminInput} value={adminData.name} />
              </section>
              {/* =============================================== */}
              <section>
                <label htmlFor="">Email <sup>*</sup></label> <br />
                <input type="text" name='email' placeholder='Enter admin email' onChange={adminInput} value={adminData.email} />
              </section>
            </div>
            {/* =============================================== */}
            <div>
              <section>
                <label htmlFor="">Phone <sup>*</sup></label> <br />
                <input type="text" name='phone' placeholder='Enter  phone number' onChange={adminInput} value={adminData.phone} />
              </section>
              {/* =============================================== */}
              <section >
                <label htmlFor="">Type <sup>*</sup></label> <br />
                <select style={{
                  width: "180px", padding: '6px',
                  border: '0.5px solid rgb(189, 186, 186)',
                  borderRadius: "3px",
                  backgroundColor: "transparent", outline: "none"
                }} name="adminType" value={adminData.adminType} onChange={adminInput} >
                  <option >Select admin type</option>
                  <option value="root">Root</option>
                  <option value="subadmin">Subadmin</option>

                </select>

              </section>
            </div>
            {/* =============================================== */}
            <div  >
              <section>
                <label htmlFor=""> State  <sup>*</sup></label> <br />
                <select style={{
                  width: "180px", padding: '6px',
                  border: '0.5px solid rgb(189, 186, 186)',
                  borderRadius: "3px",
                  outline: "none", backgroundColor: "transparent"
                }} name="state" onChange={adminInput} value={adminData.state}>
                  <option >Select admin state</option>

                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chattisgarh">Chattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himanchal Pradesh">Himanchal Pradesh</option>
                  <option value="Jammu and Kashmi">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="kerala">kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Orissa">Orissa</option>
                  <option value="Panjab">Panjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Utter Pradesh">Utter Pradesh</option>
                  <option value="Maharashtra">Uttarakhand</option>



                </select>
              </section>
              {/* =============================================== */}
              <section>
                <label htmlFor="">Joining <sup>*</sup></label> <br />
                <input style={{ width: "180px", padding: '6px', outline: "none" }} type="date" name='joining' value={adminData.joining} onChange={adminInput} />

              </section>
            </div>
            {/* =============================================== */}

            <section style={{
              width: "100%", padding: "6px",
              border: '0.5px solid rgb(189, 186, 186)',
              borderRadius: "3px",

            }}>
              <label htmlFor="">Profile Img <sup>*</sup></label> <br />
              <input type={resetFile} style={{ padding: "3px",backgroundColor:"transparent" ,border:"none",outline:"none"}} name='adminImg' onChange={(e) => setAdminProfile(e.target.files[0])} />
              {
                progress && <Progress percent={progress} />
              }
            </section>
            {/* =============================================== */}
          </div>
        </div>
      </Modal>

    </>
  )
}