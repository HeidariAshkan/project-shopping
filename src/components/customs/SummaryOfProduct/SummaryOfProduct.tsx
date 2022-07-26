import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@mui/material';

function SummaryOfProduct() {


  return (
    <>
        <div className='w-[75%] flex flex-col gap-3 items-center my-5'>
            <h1 className='text-center text-2xl font-medium '>الکترونیکی</h1>
            <div className='w-full bg-[#00FFFF] bg-opacity-[13%] p-4 rounded-3xl flex gap-3'>
                <div className='bg-[#fefefe] h-[90%] w-[20%] p-2 flex flex-col items-center gap-4 rounded-md'>
                    <img className='w-full rounded-md' alt="pic" src="https://m.media-amazon.com/images/I/31Nstl3KiJL._AC_.jpg"/>
                    <p>3500000 تومان</p>
                    <Button variant="contained" className='bg-[#5500FF] text-white px-6 py-1 hover:text-[#5500FF] hover:bg-[#fefefe] transiton-all duration-500 rounded-md'>خرید</Button>
                </div>
                <div className='bg-[#fefefe] h-[90%] w-[20%] p-2 flex flex-col items-center gap-4 rounded-md'>
                    <img className='w-full rounded-md' alt="pic" src="https://m.media-amazon.com/images/I/31Nstl3KiJL._AC_.jpg"/>
                    <p>3500000 تومان</p>
                    <Button variant="contained" className='bg-[#5500FF] text-white px-6 py-1 hover:text-[#5500FF] hover:bg-[#fefefe] transiton-all duration-500 rounded-md'>خرید</Button>
                </div>
                <div className='bg-[#fefefe] h-[90%] w-[20%] p-2 flex flex-col items-center gap-4 rounded-md'>
                    <img className='w-full rounded-md' alt="pic" src="https://m.media-amazon.com/images/I/31Nstl3KiJL._AC_.jpg"/>
                    <p>3500000 تومان</p>
                    <Button variant="contained" className='bg-[#5500FF] text-white px-6 py-1 hover:text-[#5500FF] hover:bg-[#fefefe] transiton-all duration-500 rounded-md'>خرید</Button>
                </div>
                <div className='bg-[#fefefe] h-[90%] w-[20%] p-2 flex flex-col items-center gap-4 rounded-md'>
                    <img className='w-full rounded-md' alt="pic" src="https://m.media-amazon.com/images/I/31Nstl3KiJL._AC_.jpg"/>
                    <p>3500000 تومان</p>
                    <Button variant="contained" className='bg-[#5500FF] text-white px-6 py-1 hover:text-[#5500FF] hover:bg-[#fefefe] transiton-all duration-500 rounded-md'>خرید</Button>
                </div>
                <div className='bg-[#fefefe] h-[90%] w-[20%] p-2 flex flex-col items-center gap-4 rounded-md'>
                    <img className='w-full rounded-md' alt="pic" src="https://m.media-amazon.com/images/I/31Nstl3KiJL._AC_.jpg"/>
                    <p>3500000 تومان</p>
                    <Button variant="contained" className='bg-[#5500FF] text-white px-6 py-1 hover:text-[#5500FF] hover:bg-[#fefefe] transiton-all duration-500 rounded-md'>خرید</Button>
                </div>
            </div>
        </div>
    </>
  )
}


export default SummaryOfProduct


