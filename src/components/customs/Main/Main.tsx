import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SummaryOfProduct from '../SummaryOfProduct/SummaryOfProduct';
import AmazingOffer from './../AmazingOffer/AmazingOffer';
import { getCategory } from './../../../redux/slice/categorySlice';
import { getProduct } from './../../../redux/slice/productSlice';
import ProductCategories from './../ProductCategories/ProductCategories';
import BestBuy from '../BestBuy/BestBuy';
import { RootState } from '../../../redux/store/store';


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
  
  
  const category = useSelector((state:RootState) => state.categorySlice);
  const product = useSelector((state:RootState) => state.productSlice);
  const dispatch = useDispatch();
  // dispatch(getCategory())
  useEffect(() => {
    dispatch(getCategory())
  },[])

  useEffect(() => {
    dispatch(getProduct())
  },[])

  



  // const res = fetch("http://localhost:8000/store/category").then(res => res.json().then(data => console.log(data)));
  return (
    <div className='flex flex-col items-center mt-10 my-8 gap-14'>
      <AmazingOffer product={product}/>
      {category.category.filter((item:IItem) => item.parent === null ).map((item:IItem) =>(
        <SummaryOfProduct key={item.id} category={item} product={product}/>
      ))}
      <ProductCategories category={category}/>
      <BestBuy product={product} />
    </div>
  )
}

export default Main