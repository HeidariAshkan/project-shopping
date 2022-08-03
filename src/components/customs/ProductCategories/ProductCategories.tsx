import React,{ useMemo } from 'react'
import Link  from 'next/link';


interface IProps{
    category:{
        category:[],
        status:"idle"|"pending"|"succeeded"|"failed"
    }
}

function ProductCategories({category}:IProps) {

    const parentCategory = useMemo(()=>{
        return category.category.filter((item:any)=> item.children === null)
    },[category])
    // console.log(childCategory)

  return (
    <>
        <div className="bg-[#002DB3] bg-opacity-5 rounded-xl w-[75%] p-4 flex flex-col items-center my-5 gap-14">
            <h1 className="text-black text-4xl text-center font-semibold w-full p-2">دسته بندی</h1>
            <div className="flex gap-3">
                {
                    parentCategory.map((item:any)=>(
                        <Link key={item.id} href={`products/?categorys=${item.id}`}>
                            <div className="bg-cover bg-no-repeat bg-center bg-[#fefefe] cursor-pointer rounded-full md:p-10 sm:p-8 lg:p-12 xl:p-16 p-6 shadow-lg" style={{backgroundImage:`url(${item.image})`}}>
                                {/* <img className='w-full rounded-full' src={item.image} alt="pic" /> */}
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>  
    </>
  )
}

export default ProductCategories