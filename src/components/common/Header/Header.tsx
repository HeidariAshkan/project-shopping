import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import MenuBar from '../../customs/MenuBar/MenuBar';
import ModalLogin from '../../customs/ModalLogin/ModalLogin';

function Header() {

    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [openModal, setOpenModal] = useState<boolean>(false)
    console.log(openMenu);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    }

  return (
    <div className='flex flex-row-reverse justify-between items-center'>
        <div className='py-1 px-6 w-1/5 flex flex-row-reverse items-center justify-evenly gap-5'>
            <IconButton><ShoppingCartIcon className='text-gray-800 hover:text-[#5500FF] text-3xl p-'/></IconButton>
            <IconButton onClick={(e:any)=>{setOpenModal(true)}}><AccountCircleIcon className='text-gray-800 hover:text-[#5500FF] text-3xl'/></IconButton>
        </div>
        <div className='w-2/4'>
            <form className='px-4 bg-[#F0F0F1] rounded-md flex justify-around items-center'>
                <input type="text" className="w-full bg-inherit outline-none py-1" placeholder="جستوجو" name='search'/>
                <button type='submit'><SearchIcon className='text-black text-opacity-60'/></button>
            </form>
        </div>
        <div className='w-1/5 py-1 px-6 flex flex-row-reverse items-center justify-evenly gap-5'>
            <IconButton onClick={handleClick}><MenuIcon className='text-gray-800 hover:text-[#5500FF] text-3xl' /></IconButton>
            <h1>Logo</h1>
        </div>
        <MenuBar anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={openMenu} close={setOpenMenu} />
        <ModalLogin open={openModal} close={setOpenModal}/>
    </div>
  )
}


export default Header

