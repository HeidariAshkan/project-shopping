import React , { useEffect } from 'react'
import { Modal } from '@mantine/core';
import { AiFillCheckCircle } from "react-icons/ai";
interface IProps {
    open:boolean,
    openSuccess:(open:boolean)=>void
}


function ModalSuccessPay({open , openSuccess}:IProps) {

    useEffect(()=>{
        if(open === true){
            setTimeout(()=>{
                openSuccess(false)
            },5000)
        }
    },[open])

    function handleClose (){
        openSuccess(false)
    }

  return (
    <>
        <Modal opened={open} onClose={handleClose}>
            <div className="text-green-600 text-center font-IR">
                <h1>
                    سفارش شما با موفقیت ثبت شد
                </h1>
                <AiFillCheckCircle className='text-center text-5xl mx-auto mt-2'/>
            </div>
        </Modal>
    </>
  )
}

export default ModalSuccessPay