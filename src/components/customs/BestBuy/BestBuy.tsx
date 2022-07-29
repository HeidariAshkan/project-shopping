import React, { useMemo } from 'react'

interface IProps {
    product: { 
        product: [],
        status: 'idle' | 'pending' | 'succeeded' | 'failed'
    }
}

function BestBuy({product}:IProps) {


    // console.log(product)

    const featuredProduct = useMemo(()=>{
        return product.product.filter((item:any)=> item.featured === true)
    },[product])


  return (
    <>
        <div className='flex flex-col gap-6 p-2 border rounded-xl w-[95%] items-center mb-16 pb-6'>
            <h1 className='text-center text-2xl font-semibold flex flex-row-reverse'>منتخب محصولات تخفیف و حراج <img className='w-8' src="https://img.icons8.com/color/48/000000/discount--v1.png"/></h1>
            <div className="grid grid-cols-4 gap-4">
                {featuredProduct.slice(0,12).map((item:any)=>(
                <div key={item.id} className='border p-2 rounded-md cursor-pointer hover:bg-gray-200 transition-all duration-500'>
                    <img className='w-full rounded-md h-[160px]' alt="pic" src={item.main_image}  />
                    <div className='relative'>
                        <p className='absolute bottom-4 right-1 bg-[#EF4056] text-white px-2 rounded-3xl hover:text-[#EF4056] hover:bg-white transition-all duration-500 hover:shadow-md'>{100 - +(item.final_price * 100 / item.price ).toFixed()}%</p>
                        <div className="text-end p-1">
                            <p className="">{item.final_price}</p>
                            <p className="text-[#000000] text-opacity-40 line-through">{item.price}</p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default BestBuy
 


