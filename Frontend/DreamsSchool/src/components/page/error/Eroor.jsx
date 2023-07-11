import React, { useState } from 'react'
import errorImg from "../../../assets/error.png"
import { useNavigate } from 'react-router-dom'
import errStyle from "./error.module.css"
 
const Eroor = () => {
    const Navigate = useNavigate();
    return (
        <div className={errStyle.erroContenar}>
         <div  className={errStyle.erroSubContenar}>
         
       
            <p>Page Not Found</p>
         <img src={errorImg} alt=""  /> <br />
         <button  onClick={()=>Navigate("/")}  > BACK TO HOME</button>
         </div>

        </div>

    
    )
}

export default Eroor