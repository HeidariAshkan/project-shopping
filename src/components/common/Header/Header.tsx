import React, { useState , useEffect } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { GoSearch } from 'react-icons/go'

import { ActionIcon } from '@mantine/core'
import MenuBar from '../../customs/MenuBar/MenuBar';
import ModalLogin from '../../customs/ModalLogin/ModalLogin';
import SearchProduct from './../../customs/SearchProduct/SearchProduct';



function Header() {


    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openSearch , setOpenSearch] = useState<boolean>(false)
    const [input , setInput] = useState<string>('')
    // console.log(openMenu);

    // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(e.currentTarget);
    //     setOpenMenu(true);
    // }

    useEffect(()=>{
        if(input !== ""){
            setOpenSearch(true)
        }
        if(input === ""){
            setOpenSearch(false)
        }
    },[input])

  return (
    <div className='flex flex-row-reverse justify-between items-center p-4 sticky z-50'>
        <div className='py-1 px-6 w-1/5 flex flex-row-reverse items-center justify-evenly gap-5'>
            <ActionIcon ><MdShoppingCart className='text-gray-800 hover:text-[#5500FF] text-3xl p-'/></ActionIcon>
            <ActionIcon  onClick={(e:any)=>{setOpenModal(true)}}><FaUserCircle className='text-gray-800 hover:text-[#5500FF] text-3xl'/></ActionIcon>
        </div>
        <div className='w-2/4'>
            <form className='relative px-4 bg-[#F0F0F1] rounded-md flex justify-around items-center'>
                <input type="text" className="w-full bg-inherit border-none py-1 outline-none focus:ring-0" placeholder="جستوجو" name='search' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                <button type='submit'><GoSearch className='text-black text-opacity-60'/></button>
                <SearchProduct text={input} open={openSearch} close={setOpenSearch}/>
            </form>
        </div>
        <div className='w-1/5 py-1 px-6 flex flex-row-reverse items-center justify-evenly gap-5'>
            <MenuBar/>
            <h1>Logo</h1>
        </div>
        
        <ModalLogin open={openModal} close={setOpenModal}/>
    </div>
  )
}


export default Header

