import React, { useState } from 'react'
import footerStyle from "../../css/footer/Footer.module.css"
import footerLogo from "../../../assets/logo.png"
import locationImg from "../../../assets/location.svg"
import phoneImg from "../../../assets/phone.svg"
import emailImg from "../../../assets/email.svg"
import axios from 'axios'
import ScrollToTop from "react-scroll-to-top";
import { notification } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import term from "../../../assets/Term.pdf"
import privacy from "../../../assets/Privacy.pdf"
const Footer = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [massage, setMassage] = useState("");
    const [statusCode, setStatusCode] = useState("");
     const [api,ContextHolder] = notification.useNotification()
     const {currentInstructor} =useSelector((state)=>state.instrutor)
    const SubscriptionEmailHandler = async (e) => {
        e.preventDefault();
        const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')

        if (email === "") {
            setMassage("please enter your subscription email")
        }
        else if (email.search(emailRegex)) {
            setMassage("please enter valid subscription email")
        }
        else {
            await axios.post("https://dearmschool.com/api/subscription/email", { email })
                .then((res) => {
                    setMassage(res.data.massage)
                    setStatusCode(res.data.status)
                })
                .catch((err) => {
                  setMassage(err.response.data.massage)
                    setStatusCode(err.response.data.status)
                })

        }
        setEmail("")
        setTimeout(() => {
            setMassage("")
        }, 2000)
    }

    return (
        <footer>
            <div className={footerStyle.contenars}>
                <div className={footerStyle.logoText}>
                    <div className={footerStyle.logo}>
                        <img src={footerLogo} alt="" />
                    </div>
                    <br />
                    <div className={footerStyle.text}>
                         <p>Dreams School is a 100% e-learning platform that
                            
                             provides you with online board classes and government
                              jobs preparation as well as the best tools and content 
                              for your studies. 
                            Begin your studies by enrolling in Dreams School.  </p>
                    </div>
                </div>
                <div className={footerStyle.instractor}>
                    <span className={footerStyle.heading}>For Instructor</span>
                    <ul>
                        <li> <a href=""> Profile</a></li>
                        <li> <a href="/signup"> Login</a></li>
                        <li> <a href="/login" > Register</a></li>
                        <li> <a href='' > Instructor</a></li>
                        <li> <a  href='' > Dashboard</a></li>
                    </ul>
                </div>
                <div className={footerStyle.student}>
                    <span className={footerStyle.heading}>For Student</span>
                    <ul>
                        <li> <a href=""> Profile</a></li>
                        <li> <a href="/signup"> Login</a></li>
                        <li> <a href="/login"> Register</a></li>
                        <li> <a href="/"> Student</a></li>
                        <li> <a href="/"> Dashboard</a></li>
                    </ul>
                </div>
                <div className={footerStyle.address}>

                    <span className={footerStyle.heading}>Address</span>
                    <div className={footerStyle.subscribe}>

                        <input type="text" placeholder='Enter email address '
                            onChange={(e) => setEmail(e.target.value)} value={email} />
                        <button onClick={SubscriptionEmailHandler}>Submit</button>

                    </div>
                    <div className={footerStyle.Errormassage}>
                        {massage && <p style={(statusCode === 200) ? {
                            textTransform: "capitalize"
                            , margin: '0px 0px 0px  0%',
                            fontFamily: " 'Roboto Condensed', sans-serif",
                            background: "green",
                            padding: "5px 8px",
                            width: '',
                            color: "#ffffff",
                            borderRadius: "4px",
                            textAlign: "center",
                            fontSize: "14px"
                        } : {
                            textTransform: "capitalize",
                            margin: '0px 0px 0px  0%',
                            fontFamily: " 'Roboto Condensed', sans-serif",
                            background: "red",
                            padding: "5px 8px",
                            borderRadius: "4px",
                            color: "#ffffff",
                            width: 'fit-content',
                            textAlign: "center",
                            fontSize: "14px"

                        }}>{massage}</p>}
                    </div>

                    <div className={footerStyle.location}>
                        <img src={locationImg} alt="" />
                        <span>
                            35676 NH76 Street Chitrakoot,<br /> Utter Pradesh, 210207</span>
                    </div>
                    <div className={footerStyle.email}>
                        <img src={emailImg} alt="" />
                        <span>info@dreamsschool.in</span>
                    </div>
                    <div className={footerStyle.phone}>
                        <img src={phoneImg} alt="" />
                        <span>+91 7488541791,8948837171</span>
                    </div>
                 
                </div>
            </div>
            <hr />

    
            <div className={footerStyle.copyRight}>
                < div className={footerStyle.privacy}>
                    <span> <a href={term} target='_blank'> Term of Condition </a>&nbsp;</span>
                    <span><a href={privacy} target='_blank'> Privacy Policy</a> </span>

                </div>
                <p>&copy;2023 Dreams School. All rights reserved.</p>

            </div>

            <ScrollToTop smooth color='#fff' width="23" height='23' top='500'
                style={{
                    background: "#2F4976", borderRadius: "30px", height: "45px", marginBottom: '75px', marginLeft: "80px",
                    width: "45px"
                }} />
        </footer>
    )
}



export default Footer