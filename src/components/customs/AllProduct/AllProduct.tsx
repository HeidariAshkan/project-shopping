import React , { useState , useEffect , useMemo } from "react";
import { BsFilterRight } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { Button, Select , Menu , RangeSlider , Switch , ActionIcon , Pagination  } from '@mantine/core';
import { AiFillCaretDown } from 'react-icons/ai';
import { RootState } from '../../../redux/store/store';
import { useSelector , useDispatch } from "react-redux";
import { getProduct } from './../../../redux/slice/productSlice';
import { getCategory } from './../../../redux/slice/categorySlice';
import { IoIosArrowDropleftCircle } from 'react-icons/io'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import { useRouter } from "next/router";






function AllProduct() {

    const product = useSelector((store:RootState) => store.productSlice);
    const category = useSelector((store:RootState) => store.categorySlice);

    const [startRecord , setStartRecord] = useState<number>(0)
    const [endRecord , setEndRecord] = useState<number>(12)
    const [page , setPage] = useState<number>(1)
    const [totalPage , setTotalPage] = useState<number>(1)
    const [rangeFilter , setRangeFilter] = useState<[number, number]>([90000 , 300000000])
    const [exsitProduct , setExistProduct] = useState<boolean>(false)
    const [discountProduct , setDiscountProduct] = useState<boolean>(false)

    const [filterProduct , setFilterProduct] = useState<any>([])

    const [filterByCat , setFilterByCat ] = useState<string | null>("")

    const [sortProduct , setSortProduct] = useState<string | null>('')

    const router = useRouter()
    const { categroys }:any = router.query



    useEffect(()=>{
      setFilterByCat(categroys)
    },[categroys])

    // setTotalPage(Math.ceil(filterProduct.length / 12));
    // setStartRecord((page - 1) * 12);
    // setStartRecord(page * 12);


    
    // console.log(filterByCat)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProduct())
        dispatch(getCategory())
        setSortProduct('Default')
    },[])


    const filterCategory = useMemo(()=>{
      return category?.category?.filter((item:any)=> item.children === null)
    },[category])


    
   useEffect(()=>{

     const id:any = filterCategory?.find((item:any)=> item.name === filterByCat)?.id
      if(filterByCat){
        console.log(id)
        const productFiltred:any = product.product?.filter((item:any)=> item.category === id)
        setFilterProduct(productFiltred)
      }
      if(!filterByCat){
        setFilterProduct(product.product)
      }
    
      if(rangeFilter[0] !== 90000 || rangeFilter[1] !== 300000000){
        if(id){
          const productFiltred:any = product.product?.filter((item:any)=> item.category === id)
          setFilterProduct(productFiltred.filter((item:any)=> item.final_price >= rangeFilter[0] && item.final_price <= rangeFilter[1]))
        }
        else{
          setFilterProduct(product.product.filter((item:any)=> item.final_price >= rangeFilter[0] && item.final_price <= rangeFilter[1]))
        }
      }

      if(exsitProduct){
        if(id){
          const productFiltred:any = product.product?.filter((item:any)=> item.category === id)
          setFilterProduct(productFiltred.filter((item:any)=> item.remaining > 0))
        }
        else{
          setFilterProduct(product.product.filter((item:any)=> item.remaining > 0))
        }
      }

      if(discountProduct){
        if(id){
          const productFiltred:any = product.product?.filter((item:any)=> item.category === id)
          setFilterProduct(productFiltred.filter((item:any)=> item.featured === true))
        }
        else{
          setFilterProduct(product.product.filter((item:any)=> item.featured === true))
        }
      }


    },[filterByCat , product , rangeFilter , exsitProduct , discountProduct])

    useEffect(()=>{
      switch(sortProduct){
        case 'Default':
          // copy from array then sort
          setFilterProduct(filterProduct.slice().sort(()=>Math.random() - 0.5))
          break;
        case 'High':
          setFilterProduct(filterProduct.slice().sort((a:any,b:any)=>b.final_price - a.final_price))
          break;
        case 'Low':
          setFilterProduct(filterProduct.slice().sort((a:any,b:any)=>a.final_price - b.final_price))
          break;
      }
    },[sortProduct])

    // console.log(startRecord , endRecord)
    useEffect(()=>{
      // page , next page , totalPage , ...
      setTotalPage(Math.ceil(product.product.length / 12));
      setStartRecord((page - 1) * 12);
      setEndRecord(page * 12);
    },[page , filterProduct])

 
    
    // console.log(product)
    // console.log(filterByCat)
    // console.log(filterCategory)
    
  return (
    <div className="flex items-center gap-3 my-10">
      <div className="flex flex-col gap-4 p-4 border border-[#5500FF] rounded-xl sticky top-3 self-start mt-16">
         <h1 className="text-2xl">فیلترها</h1>
         <div className="flex flex-col gap-5">
            <Select className="border-[#5500FF]" rightSection={<AiFillCaretDown/>} allowDeselect data={filterCategory?.map((item:any)=> item.name)} placeholder="دسته بندی" value={filterByCat} onChange={setFilterByCat}/> 
            <Select rightSection={<AiFillCaretDown/>} allowDeselect data={["react" ,"tsx"]} placeholder="برند" />
            
            <Menu width={200} shadow="md">
                <Menu.Target>
                  <button className="px-4 py-1 border text-[#5500FF] rounded-md">محدوده قیمت</button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item><RangeSlider min={90000} max={300000000}  size="xs" value={rangeFilter} defaultValue={[90000 , 300000000]} onChange={setRangeFilter}/></Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <div dir="ltr">
              <Switch className="" checked={exsitProduct} onChange={(event) => setExistProduct(event.currentTarget.checked)} label="کالا های موجود در انبار"/>
            </div>
            <div dir="ltr">
              <Switch checked={discountProduct} onChange={(event) => setDiscountProduct(event.currentTarget.checked)} label="کالا های تخفیف دار"/>
            </div>
         </div>
      </div>
      <div className="flex flex-col w-[90%]">
        <div className="flex flex-row-reverse justify-around p-4">
          <p>{product.product.length} کالا</p>
          <div className="flex gap-5 items-center">
            <div className="flex flex-row-reverse items-center">
              <p className="text-lg font-semibold">مرتب سازی:</p>
              <BsFilterRight className="text-[#5500FF]"/>
            </div>
            <a onClick={()=>{setSortProduct("Default")}} className="cursor-pointer text-sm hover:text-[#5500FF]">همه محصولات</a>
            <a onClick={()=>{setSortProduct("High")}} className="cursor-pointer text-sm hover:text-[#5500FF]">گران ترین</a>
            <a onClick={()=>{setSortProduct("Low")}} className="cursor-pointer text-sm hover:text-[#5500FF]">ارزان ترین</a>
            <a className="cursor-pointer text-sm hover:text-[#5500FF]">پیشنهاد خریداران</a>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {
            filterProduct?.slice(startRecord,endRecord).map((item:any) => (
            <div key={item.id} className="border rounded-lg p-2 flex flex-col justify-between">
                <img className="w-full" src={item.main_image} alt="pic" />
                <div>
                    <h4 className="w-full truncate">{item.description}</h4>
                    <div className="flex flex-row-reverse justify-between p-2">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row-reverse items-center justify-between">
                                <BsStarFill className="text-yellow-500"/>
                                3.9
                            </div>
                            <p className="text-sm ">
                                {parseInt(item.final_price).toFixed()} تومان
                            </p>
                            {(item.featured) ? <p className="text-xs text-gray-500 mx-auto line-through">{parseInt(item.price).toFixed()}</p> : ""}
                        </div>
                        <div className="flex items-center">
                            <Button size="md" variant="filled" className="text-[#5500FF] border-[#5500FF] hover:border-[#5500FF] hover:bg-[#5500FF] hover:bg-opacity-10"><GrAdd/></Button >
                        </div>
                        <div className="flex flex-col gap-4 justify-center">
                          {(item.remaining > 5) ? <p className="text-green-600">موجود در انبار</p> : (item.remaining > 0) ? <p className="text-red-600">فقط در {item.remaining}انبار</p> : <p className="text-gray-400">ناموجود</p> }
                          {(item.featured) ? <p className="bg-[#EF4056] text-white text-center px-2 rounded-3xl hover:text-[#EF4056] hover:bg-white transition-all duration-500 hover:shadow-md">{100 - +(item.final_price * 100 / item.price ).toFixed()}%</p> : ""}
                        </div>
                    </div>
                </div>
            </div>
            ))
          }
        </div>
        <div dir="ltr" className="flex justify-center">
          {/* <ActionIcon className="text-4xl">
            <IoIosArrowDroprightCircle/>  
          </ActionIcon>
          <ActionIcon className="text-4xl">
            <IoIosArrowDropleftCircle/>
          </ActionIcon> */}
          <Pagination total={totalPage} page={page} onChange={setPage}/>
        </div> 
      </div>
    </div>
  );
}

export default AllProduct;



{/* <div className="border rounded-lg p-2">
<img className="w-full" src="https://dkstatics-public.digikala.com/digikala-products/48c5a02abc05ec142e3906ff4e2c78479bb8a966_1615037236.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90" alt="pic" />
<div>
    <h4>کارت هدیه دیجی کالا به ارزش 100.000 تومان طرح روز معلم</h4>
    <div className="flex flex-row-reverse justify-between p-2">
        <div className="flex flex-col gap-4">
            <div className="flex flex-row-reverse items-center justify-between">
                <BsStarFill className="text-yellow-500"/>
                3.9
            </div>
            <p className="text-sm">
                225000 تومان
            </p>
        </div>
        <div className="flex items-center">
            <Button size="md" variant="filled" className="text-[#5500FF] border-[#5500FF] hover:border-[#5500FF] hover:bg-[#5500FF] hover:bg-opacity-10"><GrAdd/></Button >
        </div>
        <div className="flex flex-col gap-4">
            <p>موجود در انبار</p>
            <p className="bg-[#EF4056] text-white text-center px-2 rounded-3xl hover:text-[#EF4056] hover:bg-white transition-all duration-500 hover:shadow-md">25%</p>
        </div>
    </div>
</div> */}