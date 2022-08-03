import React , { useState , useEffect , useMemo, useLayoutEffect } from "react";
import { BsFilterRight } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { Button, Select , Menu , RangeSlider , Switch , Pagination  } from '@mantine/core';
import { AiFillCaretDown } from 'react-icons/ai';
import { RootState } from '../../../redux/store/store';
import { useSelector , useDispatch } from "react-redux";
import { getProduct } from './../../../redux/slice/productSlice';
import { getCategory } from './../../../redux/slice/categorySlice';
import { useRouter } from "next/router";






function AllProduct() {

    const product = useSelector((store:RootState) => store.productSlice.product);
    const category = useSelector((store:RootState) => store.categorySlice);

    // pages
    const [startRecord , setStartRecord] = useState<number>(0)
    const [endRecord , setEndRecord] = useState<number>(12)
    const [page , setPage] = useState<number>(1)
    const [totalPage , setTotalPage] = useState<number>(1)



    // filters
    const [rangeFilter , setRangeFilter] = useState<[number, number]>([90000 , 180000000])

    const [exsitProduct , setExistProduct] = useState<boolean>(false)

    const [discountProduct , setDiscountProduct] = useState<boolean>(false)

    const [filterProduct , setFilterProduct] = useState<any>(product)

    const [filterGrouping , setFilterGrouping ] = useState<string | null >(null)

    const [sortProduct , setSortProduct] = useState<string | null>('')

    const [categoryParam , setCategoryParam] = useState<string | string[] | undefined >('')


    
    
    
    
    const router = useRouter()
    const { categorys } = router.query
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getProduct())
        dispatch(getCategory())
        // setCategoryParam(router.query.categorys)
    },[])

    
    const filterCategory = useMemo(()=>{
      return category.category.filter((item:any) => item.children === null)
    },[category])
    

    // filter Product by Filtergroup and exsitProduct and discountProduct
    const filterProductByFilterGrouping = useMemo(()=>{
      if(filterGrouping === null){
        return product
      }
      return product.filter((item:any) => item.category === filterGrouping)
    },[filterGrouping,product])

    const filterProductByExsitProduct = useMemo(()=>{
      if(exsitProduct === false){
        return filterProductByFilterGrouping
      }
      return filterProductByFilterGrouping.filter((item:any) => item.remaining > 0)
    },[exsitProduct,filterProductByFilterGrouping])

    const filterProductByDiscountProduct = useMemo(()=>{
      if(discountProduct === false){
        return filterProductByExsitProduct
      }
      return filterProductByExsitProduct.filter((item:any) => item.featured === true)
    },[discountProduct,filterProductByExsitProduct])

    const filterProductByRangeFilter = useMemo(()=>{
      return filterProductByDiscountProduct.filter((item:any) => item.price >= rangeFilter[0] && item.price <= rangeFilter[1])
    },[rangeFilter,filterProductByDiscountProduct])

    const filterProductByCategory = useMemo(()=>{
      if(categoryParam === ''){
        return filterProductByRangeFilter
      }
      return filterProductByRangeFilter.filter((item:any) => item.category === categoryParam)
    },[categoryParam,filterProductByRangeFilter])
  

    useEffect(()=>{
      setFilterProduct(filterProductByCategory)
    },[filterProductByCategory])

    // sorting Products
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

    const handleAddFilterCategory = (id:any)=>{
      setFilterGrouping(id)
    }

    const handleAddFilterExist = (e:any)=>{
      setExistProduct(e.currentTarget.checked)
    }

    const handleAddFilterDiscount = (e:any)=>{
      setDiscountProduct(e.currentTarget.checked)
    }

    const handleAddFilterRange = (e:any)=>{
      setRangeFilter([e[0] , e[1]])
    }

    // Page Maker
    useEffect(()=>{
      setTotalPage(Math.ceil(filterProduct.length / 12));
      setStartRecord((page - 1) * 12);
      setEndRecord(page * 12);
      window.scrollTo(0, 0);
    },[page , filterProduct])

    
  return (
    <div className="flex items-center gap-3 my-10">
      <div className="flex flex-col gap-4 p-4 border border-[#5500FF] rounded-xl sticky top-3 self-start mt-16">
         <h1 className="text-2xl">فیلترها</h1>
         <div className="flex flex-col gap-5">
            {/* <Select className="border-[#5500FF]" rightSection={<AiFillCaretDown/>} allowDeselect data={filterCategory?.map((item:any)=> {return({value:item.id,label:item.name.toLocaleString()})})} placeholder="دسته بندی" value={filterGrouping} onChange={setFilterGrouping}/>  */}
            <Menu>
                <Menu.Target>
                  <button className="px-4 py-1 border text-[#fefefe] bg-[#5500FF] rounded-md hover:bg-[#5500FF] hover:bg-opacity-80 transition-all duration-500">دسته بندی</button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={()=>{setFilterGrouping(null)}} className="text-center">
                    همه
                  </Menu.Item>
                  {filterCategory?.map((item:any)=>(
                    <Menu.Item onClick={()=>{handleAddFilterCategory(item.id)}} className="text-center" key={item.id}>
                      {item.name}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
            </Menu>
            <Menu width={200} shadow="md">
                <Menu.Target>
                  <button className="px-4 py-1 border text-[#5500FF] rounded-md hover:bg-gray-100 transition-all duration-500">محدوده قیمت</button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item><RangeSlider min={90000} max={180000000}  size="xs" value={rangeFilter} defaultValue={[90000 , 180000000]} onChange={handleAddFilterRange}/></Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <div dir="ltr">
              <Switch checked={exsitProduct} onChange={handleAddFilterExist} label="کالا های موجود در انبار"/>
            </div>
            <div dir="ltr">
              <Switch checked={discountProduct} onChange={handleAddFilterDiscount} label="کالا های تخفیف دار"/>
            </div>
         </div>
      </div>
      <div className="flex flex-col w-[90%]">
        <div className="flex flex-row-reverse justify-around p-4">
          <p>{filterProduct.length} کالا</p>
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
            <div key={item.id} className="border rounded-lg p-2 flex flex-col justify-between hover: hover:shadow-2xl cursor-pointer">
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
                                {parseInt(item.final_price).toLocaleString("fa-IR")} تومان
                            </p>
                            {(item.featured) ? <p className="text-xs text-gray-500 mx-auto line-through">{parseInt(item.price).toLocaleString("fa-IR")}</p> : ""}
                        </div>
                        <div className="flex items-center">
                            <Button size="md" variant="filled" className="text-[#5500FF] border-[#5500FF] hover:border-[#5500FF] hover:bg-[#5500FF] hover:bg-opacity-10"><GrAdd/></Button >
                        </div>
                        <div className="flex flex-col gap-4 justify-center">
                          {(item.remaining > 5) ? <p className="text-green-600">موجود در انبار</p> : (item.remaining > 0) ? <p className="text-red-600 text-xs w-20">فقط {item.remaining} عدد موجود است</p> : <p className="text-gray-400">ناموجود</p> }
                          {(item.featured) ? <p className="bg-[#EF4056] text-white text-center px-2 rounded-3xl hover:text-[#EF4056] hover:bg-white transition-all duration-500 hover:shadow-md">{100 - +(item.final_price * 100 / item.price ).toFixed()}%</p> : ""}
                        </div>
                    </div>
                </div>
            </div>
            ))
          }
        </div>
        <div dir="ltr" className="flex justify-center">
          <Pagination total={totalPage} page={page} onChange={setPage}/>
        </div> 
      </div>
    </div>
  );
}

export default AllProduct;
