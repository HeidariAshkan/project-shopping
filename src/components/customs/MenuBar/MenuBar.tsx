import React from 'react'
import Link  from 'next/link';
import { Menu , ActionIcon } from '@mantine/core';
import { FiMenu } from 'react-icons/fi'


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
            <Menu.Item><button className='w-full border-b border-[#5500FF] py-2 px-4 hover:bg-[#5500FF] hover:text-[#fefefe] text-[#5500FF] rounded-lg'>خانه</button></Menu.Item>
        </Link>
            <Menu.Item><button className='w-full border-b border-[#5500FF] py-2 px-4 hover:bg-[#5500FF] hover:text-[#fefefe] text-[#5500FF] rounded-lg'>درباره ما</button></Menu.Item>
        <Link href="/products">
            <Menu.Item><button className='w-full border-b border-[#5500FF] py-2 px-4 hover:bg-[#5500FF] hover:text-[#fefefe] text-[#5500FF] rounded-lg'>محصولات</button></Menu.Item>
        </Link> 
    </Menu.Dropdown>
  </Menu>
  )
}

export default MenuBar