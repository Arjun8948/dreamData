import React, { useState } from 'react'
import navStyle from "./Navber.module.css"
import logo from "../../assets/logo.png"
import { Avatar } from 'antd'
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { logout } from '../../redux/adminSlice';

 

const Navber = ({setLogin}) => {
  const admin = useSelector((state)=>state.currentAdmin)
  const disptch =useDispatch()

  return (
    < header className={navStyle.header}>
      <div className={navStyle.logo}>
        <Link to="/">
          <img src={logo} alt="something erro" />
        </Link>
      </div>

      <div>
     { (admin===null)?
     <button className={navStyle.loginBtn} onClick={()=>setLogin(false)}>Login</button>
      :<button className={navStyle.loginBtn} onClick={()=>{disptch(logout())
        setLogin(false)
      }}>Logout</button>
         }
      </div>


    </ header>
  )
}

export default Navber