import React from 'react'
import { Button } from '@mui/material';

function AmazingOffer() {
  return (
    <>
        <div className='w-[90%] bg-[#00FFFF] bg-opacity-[13%] rounded-[50px] px-6 py-1 flex items-center justify-between'>
            <div>
                <h1 className='text-center text-sm font-semibold text-[#0000FF] w-5'>
                    پشنهاد شگفت انگیز 
                </h1>
            </div>
            <div className='flex gap-4 items-center'>
                <div className='relative rounded-full bg-[#fefefe] w-20 h-20 cursor-pointer'>
                    <p className='absolute bottom-1 right-1 bg-[#EF4056] text-white px-2 rounded-3xl'>
                        25%
                    </p>
                </div>
                <div className='relative rounded-full bg-[#fefefe] w-20 h-20 cursor-pointer'>
                    <p className='absolute bottom-1 right-1 bg-[#EF4056] text-white px-2 rounded-3xl'>
                        25%
                    </p>
                </div>
            </div>
            <div>
                <Button variant='outlined' className='bg-[#fefefe] rounded-3xl border-[#0000FF] text-[#0000FF] hover:text-[#fefefe] hover:bg-[#0000FF] transition-all duration-500'>بیش تر...</Button>
            </div>
        </div>
    </>
  )
}

export default AmazingOffer