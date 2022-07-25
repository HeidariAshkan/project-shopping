import React from 'react'

function AmazingOffer() {
  return (
    <>
        <div className='w-[90%] bg-[#00FFFF] bg-opacity-[13%] rounded-[50px] px-6 py-1 flex items-center justify-between'>
            <div>
                <h1 className='text-center text-sm font-semibold text-[#0000FF] w-5'>
                    پشنهاد شگفت انگیز 
                </h1>
            </div>
            <div className='flex gap-4'>
                <div className='relative rounded-full bg-[#fefefe] w-24 h-24 cursor-pointer'>
                    <p className='absolute bottom-1 right-1 bg-[#EF4056] text-white px-2 rounded-3xl'>
                        25%
                    </p>
                </div>
                <div className='relative rounded-full bg-[#fefefe] w-24 h-24 cursor-pointer'>
                    <p className='absolute bottom-1 right-1 bg-[#EF4056] text-white px-2 rounded-3xl'>
                        25%
                    </p>
                </div>
            </div>
            <div>
                <button className='bg-[#fefefe] px-5 py-2 rounded-3xl text-[#0000FF] hover:text-[#fefefe] hover:bg-[#0000FF] transition-all duration-500'>بیش تر ...</button>
            </div>
        </div>
    </>
  )
}

export default AmazingOffer