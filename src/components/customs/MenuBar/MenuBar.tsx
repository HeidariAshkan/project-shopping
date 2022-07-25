import { Menu, MenuItem } from '@mui/material'
import React from 'react'
import { isNull } from 'util'

interface IProps {
    open: boolean
    anchorEl: any
    setAnchorEl:(anchorEl: any) => void
    close: (open: boolean) => void
}

function MenuBar({open, close , anchorEl = null , setAnchorEl}: IProps) {

    const handleClose = () => {
        close(false)
        setAnchorEl(null); 
    }
  return (
    <Menu open={open} anchorEl={anchorEl} onClose={handleClose} className={`border border-[#5500FF] flex flex-col items-center justify-center`}>
        <MenuItem><button className='w-full border-b border-[#5500FF] py-2 px-4 hover:bg-[#5500FF] hover:text-[#fefefe] text-[#5500FF] rounded-lg'>خانه</button></MenuItem>
        <MenuItem><button className='w-full border-b border-[#5500FF] py-2 px-4 hover:bg-[#5500FF] hover:text-[#fefefe] text-[#5500FF] rounded-lg'>درباره ما</button></MenuItem> 
        <MenuItem><button className='w-full border-b border-[#5500FF] py-2 px-4 hover:bg-[#5500FF] hover:text-[#fefefe] text-[#5500FF] rounded-lg'>محصولات</button></MenuItem>
    </Menu>
  )
}

export default MenuBar