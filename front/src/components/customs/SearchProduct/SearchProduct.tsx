import React, { useMemo ,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import Link from 'next/link'


interface IProps {
    text:string
    setText:(text:string)=> void
    open:boolean
    close:(open: boolean) => void
}

function SearchProduct({text , open , close , setText}:IProps) {

    const product = useSelector((store:RootState) => store.productSlice);

   const itemProduct= useMemo(()=>{
        return product.product.filter((item:any) => item.description.includes(text) || item.name.includes(text));
    },[text])

  return (
    <div className={`absolute top-7 flex flex-col gap-2 bg-[#fefefe] p-4 rounded-lg border w-full ${(open) ? "block" : "hidden"}`}>
        {(itemProduct.length > 0) ? itemProduct.slice(0,4).map((item:any) => (
            <Link key={item.id} href={`/products/${item.id}`}>
                <div onClick={()=>{close(false);setText('')}} className="flex flex-row-reverse xs:flex-col justify-between items-center border border-[#5500FF] rounded-xl p-4 cursor-pointer hover:bg-[#5500FF] hover:text-[#fefefe] hover:bg-opacity-50 hover:border-inherit">
                    <img className="w-24 rounded-xl" src={item.main_image} alt="pic" />
                    <div>
                        <p className="xl:text-lg lg:text-lg md:text-lg sm:text-base text-lg font-semibold text-center">{item.name}</p> 
                        <p className="xl:w-96 lg:w-64 md:w-52 sm:w-32 xs:w-0 w-16 truncate">{item.description}</p>
                    </div>
                </div>
            </Link>
        )) : <p className="text-center">نتیجه ای یافت نشد</p>}
    </div>

  )
}

export default SearchProduct