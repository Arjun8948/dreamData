import React, { useState } from 'react'
import aiStyle from "./Schoolai.module.css"
import sendIcon from "../assets/sendIcon.svg"
import axios from "axios"
import { notification } from 'antd';

const Schoolai = () => {
    const [inputValue, setInput] = useState("");
    const [result, setResult] = useState(["xscdvfghokij","sdfghjhgfddfnbv"]);
    const [messageApi, inputErrorMassage] = notification.useNotification();


    const getAiResult = () => {
        if (inputValue === "" || inputValue == null) {
            messageApi.error({
                message: `You Don't Have Enter Problem `,
                description: `Please Enter Your Problem `,
                placement: 'top',

            })
            return false;
        }
        axios.post('http://localhost:8080/api/generate', { inputValue }).then((res) => {
            setResult([...result, res.data.choices[0].message.content]);
        }).catch((err) => {
            messageApi.error({
                message: `Internal Server Error`,
                description: `${err?.response?.data.massage}`,
                placement: 'top',

            })
           
        })
        setInput("")
    }

    const deteteResult =(index)=>{
     
     const newData = result.filter((c,i)=>{
        return index!==i;
     })
     setResult(newData)
    }

   
    return (
        <div className={aiStyle.mainContener}>
            {inputErrorMassage}
            <div className={aiStyle.sideBar}>
                <div className={aiStyle.sideBarInput} >
                    <input type="text" placeholder='+  New-chat' />
                </div>
                
            </div>
            <div className={aiStyle.mainSection}>
                <div className={aiStyle.mainHeading}>
                    <h2>Dreams School 3.0</h2>
                </div>
                <div className={aiStyle.mainResult} >
                    <div className={aiStyle.textExample}>
                        <div>

                            <span class="material-symbols-outlined ">light_mode</span>

                            <div className={aiStyle.aiHeading}>Examples</div>
                            <div className={aiStyle.textMainDiv}>
                                <div className={aiStyle.textDiv}>
                                    <p>Explain quantum computing in simple terms</p>
                                </div>
                                <div className={aiStyle.textDiv}>
                                    <p>Got any creative ideas learning releted problem?</p>
                                </div>
                                <div className={aiStyle.textDiv}>
                                    <p>How do I make an HTTP request in Javascript?</p>
                                </div>
                            </div>
                        </div>
                        {/* ========== */}
                        <div>

                            <span class="material-symbols-outlined">bolt</span>

                            <div className={aiStyle.aiHeading}>Capabilities</div>
                            <div className={aiStyle.textMainDiv}>
                                <div className={aiStyle.textDiv}>
                                    <p>Remembers what user said earlier in the conversation</p>
                                </div>
                                <div className={aiStyle.textDiv}>
                                    <p>Allows user to provide follow-up corrections</p>
                                </div>
                                <div className={aiStyle.textDiv}>
                                    <p>Trained to decline inappropriate requests</p>
                                </div>
                            </div>
                        </div>
                        {/* ============= */}
                        <div >

                            <span class="material-symbols-outlined">warning</span>

                            <div className={aiStyle.aiHeading}>Limitations</div>
                            <div className={aiStyle.textMainDiv}>
                                <div className={aiStyle.textDiv}>
                                    <p>May occasionally generate incorrect information</p>
                                </div>
                                <div className={aiStyle.textDiv}>
                                    <p>May occasionally produce harmful instructions or biased content</p>
                                </div>
                                <div className={aiStyle.textDiv}>
                                    <p>Limited knowledge of world and events after 2021</p>
                                </div>
                            </div>
                        </div>
                        {/* ============================== */}
                    </div>
                   

                </div>
                <div className={aiStyle.inputSearchBarDiv}>
                    <div>

                        <input type="text" placeholder='Send a massage'
                            onChange={(e) => setInput(e.target.value)} value={inputValue} />

                        <img src={sendIcon} alt="something error" onClick={getAiResult} />

                    </div>
                </div>
                <div className={aiStyle.result}>
                        {
                              result.map((res,ind) => (
                                <div className={aiStyle.resultContenar}>
                                      <div key={ind} >
                                         {res}  
                                      </div>
                                       <span className={aiStyle.closebtn}
                                        onClick={()=>deteteResult(ind)}>X</span> 
                                </div>
                                  ))

                        }
                    </div>
            </div>
        </div>
    )
}

export default Schoolai;