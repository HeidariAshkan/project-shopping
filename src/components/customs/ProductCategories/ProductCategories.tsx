import React,{ useMemo } from 'react'

interface IProps{
    category:{
        category:[],
        staus:"idle"|"pending"|"succeeded"|"failed"
    }
}

function ProductCategories({category}:IProps) {

    const childCategory = useMemo(()=>{
        return category.category.filter((item:any)=> item.children === null)
    },[category])
    // console.log(childCategory)

  return (
    <>
        <div className="bg-[#002DB3] bg-opacity-5 rounded-xl w-[75%] p-4 flex flex-col items-center my-5 gap-14">
            <h1 className="text-black text-4xl text-center font-semibold">دسته بندی</h1>
            <div className="flex gap-3 items-center">
                {
                    childCategory.map((item:any)=>(
                        <div key={item.id} className="bg-cover bg-[#fefefe] cursor-pointer rounded-md ">
                            <img className='w-full rounded-md' src={item.image} alt="pic" />
                        </div>
                    ))
                }
            </div>
        </div>  
    </>
  )
}

export default ProductCategories