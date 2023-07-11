import { Button, Drawer, Space } from 'antd'
import React, { useState } from 'react'
import { CgCloseO, CgMenuRound } from "react-icons/cg"
const Student = () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();

    const showDefaultDrawer = () => {
      setSize('default');
      setOpen(true);
    };
   
    const onClose = () => {
      setOpen(false);
    };

  return (
     
         <>
      <Space>
        <span type="primary" onClick={showDefaultDrawer}>
         <CgMenuRound size={30}/>
        </span>
       
      </Space>
      <Drawer
        title={`${size} Drawer`}
        placement="left"
        size={size}
        onClose={onClose}
        closable={false}
        open={open}
        extra={
          <Space>
            <span onClick={onClose}> <CgCloseO size={30} /></span>
      
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}

export default Student