import React, { useState , useEffect } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { GoSearch } from 'react-icons/go'
import { ActionIcon, Button } from '@mantine/core'
import MenuBar from '../../customs/MenuBar/MenuBar';
import ModalLogin from '../../customs/ModalLogin/ModalLogin';
import SearchProduct from './../../customs/SearchProduct/SearchProduct';
import Cart from './../../customs/Cart/Cart';
import { useSelector } from 'react-redux';
import { TbLogout } from 'react-icons/tb';
import Cookies from 'js-cookie'
import ModalLogOut from '../../customs/ModalLogOut/ModalLogOut'
import ModalBuy from './../../customs/ModalBuy/ModalBuy';



function Header() {


    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openSearch , setOpenSearch] = useState<boolean>(false)
    const [input , setInput] = useState<string>('')
    const [openCart , setOpenCart] = useState<boolean>(false)
    const cart = useSelector((state:any)=>state.orderCartSlice)
    const [modalLogOut , setModalLogOut] = useState<boolean>(false)
    const [modalBuy , setModalBuy] = useState<boolean>(false)
    const[myCookie , setMyCookie] = useState<string | null | undefined>(undefined)

    useEffect(()=>{
        if(input !== ""){
            setOpenSearch(true)
        }
        if(input === ""){
            setOpenSearch(false)
        }
    },[input])
    useEffect(()=>{     
        setMyCookie(Cookies.get('token'))
    },[])
    // console.log(myCookie)


  return (
    <div className='flex flex-row-reverse justify-between items-center p-4 sticky z-50'>
        <div className='py-1 px-6 w-1/5 flex flex-row-reverse items-center justify-evenly gap-5'>
            <div className='relative'>
                <ActionIcon onClick={()=>{setOpenCart(!openCart)}}><MdShoppingCart className={`hover:text-[#5500FF] relative text-3xl ${(openCart) ? 'text-[#5500FF]': 'text-gray-800'}`}/><span className={`bg-[#EF4056] left-4 top-3 text-white text-xs rounded-full absolute ${(cart.cart.length > 0 ) ? 'p-1' : ""}`}>{(cart.cart.length > 0 ) ? cart.cart.length : ""}</span></ActionIcon>
                <Cart open={openCart} products={cart} SetOpenModalBuy={setModalBuy} setOpenModalLogin={setOpenModal}/>
            </div>
            {
                (myCookie) ? <ActionIcon onClick={()=>{setModalLogOut(true)}}><TbLogout className='text-gray-800 hover:text-[#5500FF] text-3xl'/></ActionIcon> : <ActionIcon  onClick={(e:any)=>{setOpenModal(true)}}><FaUserCircle className='text-gray-800 hover:text-[#5500FF] text-3xl'/></ActionIcon>
            }       
        </div>
        <div className='w-2/4'>
            <form className='relative px-4 bg-[#F0F0F1] rounded-md flex justify-around items-center'>
                <input type="text" className="w-full bg-inherit border-none py-1 outline-none focus:ring-0" placeholder="جستوجو" name='search' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                <button type='submit'><GoSearch className='text-black text-opacity-60'/></button>
                <SearchProduct text={input} setText={setInput} open={openSearch} close={setOpenSearch}/>
            </form>
        </div>
        <div className='w-1/5 py-1 px-6 flex flex-row-reverse items-center justify-evenly gap-5'>
            <MenuBar/>
            <h1>Logo</h1>
        </div>
        <ModalLogOut open={modalLogOut} close={setModalLogOut}/>
        <ModalLogin open={openModal} close={setOpenModal}/>
        <ModalBuy open={modalBuy} close={setModalBuy} products={cart} />
    </div>
  )
}


export default Header

