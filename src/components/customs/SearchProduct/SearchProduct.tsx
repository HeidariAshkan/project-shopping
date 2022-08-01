import React, { useMemo ,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';


interface IProps {
    text:string
    open:boolean
    close:(open: boolean) => void
}

function SearchProduct({text , open , close}:IProps) {

    const product = useSelector((store:RootState) => store.productSlice);

   const itemProduct= useMemo(()=>{
        return product.product.filter((item:any) => item.description.includes(text));
    },[text])

  return (
    <div className={`absolute top-7 flex flex-col gap-2 bg-[#fefefe] p-4 rounded-lg border w-full ${(open) ? "block" : "hidden"}`}>
        {(itemProduct.length > 0) ? itemProduct.slice(0,4).map((item:any) => (
            <div key={item.id} className="flex flex-row-reverse justify-between items-center border border-[#5500FF] rounded-xl p-4">
                <img className="w-20" src={item.main_image} alt="pic" />
                 <p>{item.name}</p>
            </div>
        )) : <p className="text-center">نتیجه ای یافت نشد</p>}
    </div>

  )
}

export default SearchProduct