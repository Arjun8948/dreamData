import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/login/Login'
import Navber from './components/navbar/Navber'
const App = () => {
  const [login,setLogin] =useState(false);
  useEffect(()=>{
    const token = sessionStorage.getItem("admintoken")
 if(token===null || token===""){
    
      setLogin(false)
    }else{
      setLogin(true)
 
    }
  },[])
  return (
   
      <div style={{height:"100vh",width:"100%"}}>
<      div style={{height:"50px",width:"100%",position:"sticky" ,zIndex:4  ,top:"0",backgroundColor:"#ffffff"}}>
        <Navber login={login} setLogin={setLogin}/>
        </div>
        <div style={{height:"calc(100vh -60px)",width:"100%",overflowY:"scroll"}}>
      <Routes>
        <Route path='/'>
          < Route index element={(login)?<Dashboard login={login} setLogin={setLogin}/>:<Login setLogin={setLogin}/>} />
        
        </Route  >
      </Routes>
      </div>
      </div>
 
  )
}

export default App



