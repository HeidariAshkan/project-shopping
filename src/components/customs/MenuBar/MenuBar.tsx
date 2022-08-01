import React from 'react'
import Link  from 'next/link';
import { Menu , ActionIcon } from '@mantine/core';
import { FiMenu } from 'react-icons/fi'
import { RiSendPlane2Fill } from 'react-icons/ri';


// interface IProps {
//     open: boolean
//     anchorEl: any
//     setAnchorEl:(anchorEl: any) => void
//     close: (open: boolean) => void
// }
// {open, close , anchorEl = null , setAnchorEl}: IProps

function MenuBar() {


  return (
  <Menu width={150} shadow="md">
    <Menu.Target>
        <ActionIcon><FiMenu className='text-gray-800 hover:text-[#5500FF] text-3xl' /></ActionIcon>
    </Menu.Target>
    <Menu.Dropdown className={`border border-[#5500FF] flex flex-col items-center justify-center`}>
        <Link href="/">
            <Menu.Item><div className='w-full border-b border-[#5500FF] py-2 px-4 hover:bg-[#5500FF] hover:text-[#fefefe] text-[#5500FF] rounded-lg text-center'>خانه</div></Menu.Item>
        </Link>
            <Menu.Item><div className='w-full border-b border-[#5500FF] py-2 px-4 hover:bg-[#5500FF] hover:text-[#fefefe] text-[#5500FF] rounded-lg text-center'>درباره ما</div></Menu.Item>
        <Link href="/products">
            <Menu.Item><div className='w-full border-b border-[#5500FF] py-2 px-4 hover:bg-[#5500FF] hover:text-[#fefefe] text-[#5500FF] rounded-lg text-center'>محصولات</div></Menu.Item>
        </Link> 
    </Menu.Dropdown>
  </Menu>
  )
}

export default MenuBar