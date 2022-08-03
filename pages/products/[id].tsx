import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSelfProduct } from './../../src/redux/slice/selfProductSlice';
import Layout from './../../src/Layout/Layout';
import SelfProduct from './../../src/components/customs/SelfProduct/SelfProduct';
import { getProduct } from './../../src/redux/slice/productSlice';

function id() {

  const dispatch  = useDispatch()
  const selfProduct = useSelector((store:RootState) => store.selfProductSlice)
  const allProduct = useSelector((store:RootState) => store.productSlice)
  const router = useRouter()

  const [idProduct , setIdProduct] = useState<string | string[] |undefined>('')

  useEffect(()=>{
    setIdProduct(router.query.id)
  },[router])

  useEffect(()=>{
    if(idProduct !== '' && idProduct !== undefined){
      dispatch(getSelfProduct(idProduct))
      dispatch(getProduct())
    }
  },[idProduct])


  return (
    
    <div dir='rtl' className="relative">
      <Layout>
          <div>
            <SelfProduct allProduct={allProduct} product={selfProduct?.selfProduct}/>
          </div>
      </Layout>
    </div>
  )
}

export default id