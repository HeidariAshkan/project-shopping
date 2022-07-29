import { Button } from '@mantine/core'
import React, { useMemo } from 'react'


interface IProps{
    product:{
        product:[],
        status:"idle"|"pending"|"succeeded"|"failed"
    }
}

function AmazingOffer({ product }:IProps) {


    const productFeatured = useMemo(() => {
        return product.product.filter((item:any)=>item.featured === true)
    },[product])

    const productFeaturedRandom = useMemo(()=>{
        return productFeatured.sort(()=>Math.random() - 0.5)
    },[productFeatured])

    // console.log(productFeaturedRandom)
  return (
    <>
        <div className='w-[90%] bg-[#00FFFF] bg-opacity-[13%] rounded-[50px] px-6 py-1 flex items-center justify-between'>
            <div className='w-14'>
                <h1 className='text-center text-sm font-semibold text-[#0000FF]'>
                    پشنهاد  
                </h1>
                <h1 className='text-center text-sm font-semibold text-[#0000FF]'>
                     شگفت  
                </h1>
                <h1 className='text-center text-sm font-semibold text-[#0000FF]'>
                    انگیز 
                </h1>
            </div>
            <div className='flex gap-4 items-center z-0'>
                {
                    productFeaturedRandom.slice(0,7).map((item:any)=>(
                        <div key={item.id} style={{backgroundImage:`url(${item.main_image})`}} className='relative bg-[#fefefe] rounded-full w-20 h-20 cursor-pointer bg-cover'>
                            <p className='absolute bottom-1 right-1 bg-[#EF4056] text-white px-2 rounded-3xl hover:text-[#EF4056] hover:bg-white transition-all duration-500 hover:shadow-md'>
                                {100 - +(item.final_price * 100 / item.price).toFixed()}%
                            </p>
                        </div>
                    ))
                }
            </div>
            <div>
                <Button variant='filled' className='bg-[#fefefe] rounded-3xl border-[#0000FF] text-[#0000FF] hover:text-[#fefefe] hover:bg-[#0000FF] transition-all duration-500'>بیش تر...</Button>
            </div>
        </div>
    </>
  )
}

export default AmazingOffer



                // <div className='relative rounded-full bg-[#fefefe] w-20 h-20 cursor-pointer'>
                //     <p className='absolute bottom-1 right-1 bg-[#EF4056] text-white px-2 rounded-3xl'>
                //         25%
                //     </p>
                // </div>