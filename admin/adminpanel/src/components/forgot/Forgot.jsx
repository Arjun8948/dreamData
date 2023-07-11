import { Button, Card, Input, Modal, notification } from 'antd';
import { useState } from 'react';
import { Alert } from 'antd';
import axios from "axios"

const Forgot = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [verify, setVerify] = useState( false);
    const [forgotData,setForgotData] =useState({
        email:"",
        password:"",
        confirm_password:""
    })
    const [verifyId,setVerifyId] =useState("")
    const [emailVerify,setEmailVerify] = useState("")
    const [api, contextHolder] = notification.useNotification();
    const forgetInput =(e)=>{
        setForgotData({
            ...forgotData,[e.target.name]:e.target.value
        })
    }

    console.log(forgotData);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {

       if(forgotData.email==="" || forgotData.email===null){
        api.error({
            message: ` Registered Email Required`,
            description:`Enter Your Registered Email `,
            placement:'top',
          });
       
        return false
       }

        if(!verify){
        axios.put(`https://dearmschool.com/api/admin/forgot`,{email:forgotData.email}).then((res)=>{
          setVerifyId(res.data.admin._id)
          api.success({
            message: `Email Verification Success `,
            description:`${res.data.massage}`,
            placement:'top',
          });
          setVerify(true)
        }).catch((err)=>{
            api.error({
                message: `Email Verification Filed`,
                description:`${err.response?.data?.massage || "Internal Server Error"}`,
                placement:'top',
              });
              setVerify(false)
              return false
        })
      
        }else{
            if(forgotData.password==="" || forgotData.password===null){
                api.error({
                    message: `New Password Required`,
                    description:`Enter Your new Password `,
                    placement:'top',
                  });
               
                return false
               }

               else if( forgotData.confirm_password==="" || forgotData.confirm_password===null){
                api.error({
                    message: `New Password Required`,
                    description:`Enter Your new Password `,
                    placement:'top',
                  });
               
                return false
               
            }
            else if( forgotData.confirm_password!==forgotData.password){
                api.error({
                    message: `Confirm Password filed`,
                    description:`Confirm Password does't match`,
                    placement:'top',
                  });
               
                return false
               
            }

          else{
            if(verifyId===null || verifyId===""){
                api.error({
                    message: `Email Verification Filed`,
                    description:`Please Verify Your Email  `,
                    placement:'top',
                  });
               setVerify(false)
                return false
                 }

            axios.put(`https://dearmschool.com/api/admin/forgot`,{id:verifyId,password:forgotData.password}).then((res)=>{
               
                api.success({
                  message: `New Password  Reset Success`,
                  description:`${res.data.massage}`,
                  placement:'top',
                });
               return ;
              }).catch((err)=>{
                  api.error({
                      message: `New Password  Reset Filed`,
                      description:`${err.response?.data?.massage || "Internal Server Error"}`,
                      placement:'top',
                    });
                 return false
              })
            

         } 
      
      
        setTimeout(()=>{
            setForgotData({
                email:"",
                password:"",
                confirm_password:""
            })
            setVerifyId("")
            setVerify(false)
            setIsModalOpen(false);
        },4000)
    }

 
    };
    const handleCancel = () => {
        setVerifyId("")
        setForgotData({
          email:""
        })
        setVerify(false)
        setIsModalOpen(false);
        setIsModalOpen(false);

    };

 
    return (
        <>
        {contextHolder}
            < span onClick={showModal}>
                Forgot Password ?
            </span>
            <Modal title="Forgot Password" open={isModalOpen} 
            okText={(verify) ? "Forgot now" : "Verify"} onOk={handleOk} onCancel={handleCancel}>
            < div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:"column",padding:"0px 45px"}}>
              {
              (!verify) ?
              <div style={{width:'100%',marginBottom:"7px" }}>
                <label  style={{padding:'2.4px'}} >Email <sup>*</sup></label>
                 <input type="text" placeholder='Enter Registered Email' 
                 style={{padding:"10px",width:'100%'
                 ,outline:"none",borderRadius:"5px",
                border:"0.5px solid lightgray"
                }} name='email' value={forgotData.email} onChange={forgetInput}/>
                </div>
                 :
                <Alert message="Email Verification Successfully Completed" type="success" showIcon style={{padding:"8px",width:'100%',marginBottom:'7px'}} />

                }
 
                {
                    verify &&
                <>
                <div style={{width:'100%',marginBottom:"7px" }}>
                  <label style={{padding:'2px'}} >New Password <sup>*</sup></label>
                <input type="text" placeholder='Enter New Password ' style={{padding:"10px",width:'100%'
             ,outline:"none",borderRadius:"5px",
             border:"0.5px solid lightgray"
            }}  
            name='password' value={forgotData.password} onChange={forgetInput}
            />
                </div>
  
                <div style={{width:'100%'}}>
                  <label style={{padding:'2px'}}>Confirm Password <sup>*</sup></label>
                <input type="text" placeholder='Enter Confirm Password' style={{padding:"10px",width:'100%'
                ,outline:"none",borderRadius:"5px",
                border:"0.5px solid lightgray"
            }}
            name='confirm_password' value={forgotData.confirm_password} onChange={forgetInput}
            
            />
                </div>
               </>
                }

</div>

            </Modal>
        </>
    );
};
export default Forgot;