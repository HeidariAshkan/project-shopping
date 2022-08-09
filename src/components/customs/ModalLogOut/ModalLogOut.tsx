import { Button, Modal } from '@mantine/core';
import React from 'react'
import Cookies from 'js-cookie'


interface IProps {
    open: boolean;
    close: (open: boolean) => void;
  }

function ModalLogOut({ open, close }: IProps) {

    const handleClose = () => {
        close(false);
    }

  return (
    <Modal size="md" opened={open} onClose={handleClose}>
        <div className='flex flex-col justify-center text-center gap-3'>
            <h1>مطمئنی میخوای بری ؟</h1>
            <Button onClick={()=>{Cookies.remove('token');location.reload()}} variant='filled' className='text-white bg-red-500 hover:bg-red-600'>
                خروج
            </Button>
        </div>
    </Modal>
  )
}

export default ModalLogOut