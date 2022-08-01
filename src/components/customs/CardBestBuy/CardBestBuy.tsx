import React, { useMemo } from 'react'

interface IProps {
    product: { 
        product: [],
        status: 'idle' | 'pending' | 'succeeded' | 'failed'
    }
}

function CardBestBuy({product}:IProps) {


    // console.log(product)

    const featuredProduct:any = useMemo(()=>{
        return product.product.filter((item:any)=> item.featured === true)
    },[product])


  return (
    <>
            {featuredProduct.slice(0,21).map((item:any)=>(
            <div key={item.id} className='border p-2 rounded-md cursor-pointer hover:bg-gray-200 transition-all duration-500'>
                <img className='w-full rounded-md h-[160px]' alt="pic" src={item.main_image}  />
                <div className='relative'>
                    <p className='absolute bottom-4 right-1 bg-[#EF4056] text-white px-2 rounded-3xl hover:text-[#EF4056] hover:bg-white transition-all duration-500 hover:shadow-md'>{100 - +(item.final_price * 100 / item.price ).toFixed()}%</p>
                    <div className="text-end p-1">
                        <p className="">{parseInt(item.final_price).toLocaleString("fa-IR")}</p>
                        <p className="text-[#000000] text-opacity-40 line-through">{parseInt(item.price).toLocaleString("fa-IR")}</p>
                    </div>
                </div>
            </div>
            ))}
    </>
  )
}

export default CardBestBuy
 


