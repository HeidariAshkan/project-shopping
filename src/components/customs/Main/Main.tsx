import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SummaryOfProduct from '../SummaryOfProduct/SummaryOfProduct';
import AmazingOffer from './../AmazingOffer/AmazingOffer';
import { getCategory } from './../../../redux/slice/categorySlice';
import { getProduct } from './../../../redux/slice/productSlice';
interface categoryState {
  category : [],
  status : "idle"|"pending"|"succeeded"|"failed"
}

interface IItem {
      id:number,
      parent:null | [],
      children:[],
      name:string,
      slug:null,
      featured:boolean,
      icon:null|string
}


function Main() {
  
  
  const category = useSelector((state:any) => state.categorySlice);
  const product = useSelector((state:any) => state.productSlice);
  const dispatch = useDispatch();
  // dispatch(getCategory())
  useEffect(() => {
    dispatch(getCategory())
  },[])

  useEffect(() => {
    dispatch(getProduct())
  },[category])

  



  // const res = fetch("http://localhost:8000/store/category").then(res => res.json().then(data => console.log(data)));
  return (
    <div className='flex flex-col items-center mt-8'>
      <AmazingOffer product={product}/>
      {category.category.filter((item:IItem) => item.parent === null ).map((item:IItem) =>(
        <SummaryOfProduct key={item.id} category={item} product={product}/>
      ))}
    </div>
  )
}

export default Main