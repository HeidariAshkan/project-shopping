import React from 'react'
import { Modal, Button } from '@mantine/core';
import  Cookies  from 'js-cookie';
import { useDispatch } from 'react-redux';
import { getProduct } from './../../../redux/slice/productSlice';

interface IProps {
    open: boolean;
    openModal: (value: boolean) => void,
    id:number | null | undefined
}

function ModalDeleteProduct({ open , openModal , id }: IProps) {

    const dispatch = useDispatch()

    // console.log(id)
    const handleDelete = (e:any , id: number | null | undefined)=>{
        e.preventDefault()
        fetch(`http://localhost:8000/store/product/id/${id}`,{
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + Cookies.get('token')
             },
        }).then(response => response.json()).then(data => {
            // console.log(data)
            dispatch((getProduct()))
            openModal(false)
        }).catch(err => console.error(err))
    }


    // console.log(Cookies.get('token'))
  return (
    <>
        <Modal opened={open} onClose={()=>{openModal(false)}} className='font-IR' >
            <h1 className="text-center text-2xl mb-5">میخوای پروداکت رو حذف کنی !</h1>
            <div className='flex justify-center gap-4'>
                <Button onClick={()=>{openModal(false)}} className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg ml-2 font-IR">ولش کن</Button>
                <Button onClick={(e:any)=>{handleDelete(e , id)}} className='bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg font-IR'>حذف</Button>
            </div>
        </Modal>
    </>
  )
}

export default ModalDeleteProduct