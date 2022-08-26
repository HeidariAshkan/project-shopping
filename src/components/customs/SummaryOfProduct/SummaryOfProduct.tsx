import React, { useEffect, useMemo , useState , useCallback } from 'react'
import Image from 'next/image'
import { useSelector , useDispatch } from 'react-redux';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { useHorizontalScroll } from './../../../utils/useHorizontalScroll';


interface IProps {
    category?:{
        id:number,
        parent:null | [],
        children:[],
        name:string,
        slug:null,
        featured:boolean,
        icon:null|string
    };
    product:{
        product:[],
        status:"idle"|"pending"|"succeeded"|"failed"
    }
}

function SummaryOfProduct({ category , product }:IProps) {


    const scrollRef = useHorizontalScroll();

    // console.log(category)
    // console.log(product)
    const productOfCategory = useMemo(()=>{
        if(category?.id === 1){
            return product.product.filter((item:any)=> item.category === 2 || item.category === 3 || item.category === 8)
        }
        else{
            return product.product.filter((item:any)=> item.category === 5 || item.category === 6 || item.category === 7)
        }
    },[category , product]);
      



    // console.log(productOfCategory)
    // sort Random productOfCategory
    const randomProduct = useMemo(()=>{
        return productOfCategory.sort(()=>Math.random() - 0.5)
    },[productOfCategory])
  return (
    <>
        <div  className='w-[75%] flex flex-col gap-3 items-center my-5'>
            <h1 className='text-center text-2xl font-medium '>{category?.name}</h1>
            <div ref={scrollRef} className='w-full bg-[#00FFFF] bg-opacity-[13%] p-4 rounded-3xl flex gap-3 overflow-x-scroll no-scrollbar shadow-md'>
                {
                    randomProduct.slice(0 , 10).map((item:any)=>(
                        <Link key={item.id}  href={`/products/${item.id}`}>
                            <div className='bg-[#fefefe] h-[270px] w-44 p-2 flex flex-col items-center gap-4 rounded-md justify-between border border-[#5500FF] shadow-md '>
                                <img className='w-full rounded-md h-[160px]' alt="pic" src={item.main_image}/>
                                <div className="w-[160px] flex flex-col items-center gap-2" dir="rtl">
                                    <p className="">{parseInt(item.final_price).toLocaleString('fa-IR')} تومان</p>
                                    <Button variant="filled" className='bg-[#5500FF] text-white px-6 py-1 hover:text-[#5500FF] hover:bg-[#fefefe] transiton-all duration-500 rounded-md hover:border-[#5500FF] hover:border'>خرید</Button>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    </>
  )
}


export default SummaryOfProduct


