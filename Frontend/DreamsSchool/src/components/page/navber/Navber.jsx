import React, { useEffect, useState } from 'react'
import openIcon from '../../../assets/menu.png'
import closeIcon from '../../../assets/cancel.png'
import navStyle from "../../css/navber/Navbar.module.css"
import {Link, useNavigate} from "react-router-dom"
import logo from  "../../../assets/logo.png"
import Demo from '../enquriy/Demo'

const Navber = () => {
    const [toggle, setToggle] = useState(false)
    const [windowSize, setWindowSize] = useState('')
     const navigate = useNavigate()
    useEffect(() => {
        setInterval(() => {
            setWindowSize(window.innerWidth)
        }, 0)

    }, [windowSize])

    return (
        <header className={navStyle.header}>
            <div className={navStyle.brands}>
                <img src={logo} className={navStyle.logoStyle} alt="logo someting wrong"  onClick={()=>navigate("/")}/>
                
            </div>

            {
                (windowSize <851) ?
                    (toggle && <div className={navStyle.menuOption}  >
                        <a onClick={()=>navigate("/")}> Home</a>
                        <a onClick={()=>navigate("/course")}>Course</a>
                        <a onClick={()=>navigate("/about")}>About</a>
                        <a onClick={()=>navigate("/login")} className={navStyle.loginBtn}>Login</a>
                 
                     <Demo/>
                    </div>) :
                    
                    <div className={navStyle.menuOption}  >
                       <Link to="/" > <span> Home</span> </Link>
                       <Link to="/course" > <span>Course</span></Link>
                       <Link to="/about" > <span>About</span></Link>
                       <Link to="/login" > <span className={navStyle.loginBtn}>Login</span> </Link>
                       <Link> <span ><Demo/></span></Link>
                    </div>
            }
            <div className={navStyle.toogle}>
                {(toggle) ?
                    < div className="closed" onClick={() => setToggle(!true)}>
                        <img src={closeIcon} alt="someting error" />
                    </div> :
                    <div className="open" onClick={() => setToggle(!false)}>
                        <img src={openIcon} alt="someting error" />

                    </div>
                }
            </div>
        </header>
    )
}

export default Navber