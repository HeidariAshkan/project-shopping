import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSelfProduct } from './../../src/redux/slice/selfProductSlice';
import Layout from './../../src/Layout/Layout';
import SelfProduct from './../../src/components/customs/SelfProduct/SelfProduct';
import { getProduct } from './../../src/redux/slice/productSlice';
import { LoadingOverlay } from '@mantine/core';

function id() {

  const dispatch  = useDispatch()
  const selfProduct = useSelector((store:RootState) => store.selfProductSlice)
  const allProduct = useSelector((store:RootState) => store.productSlice)
  const router = useRouter()

  const [idProduct , setIdProduct] = useState<string | string[] |undefined>('')
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(()=>{
    setIdProduct(router.query.id)
  },[router])

  useEffect(()=>{
    if(idProduct !== '' && idProduct !== undefined){
      dispatch(getSelfProduct(idProduct))
      dispatch(getProduct())
    }
  },[idProduct])

  useEffect(()=>{
    if(selfProduct.status === "succeeded" && allProduct.status === "succeeded"){
      setVisible(false)
    }
    else{
      setVisible(true)
    }
  },[selfProduct , allProduct])


  return (
    <>
      <div className={`${(visible) ? "" : "hidden"}`}>
      <LoadingOverlay visible={visible} overlayBlur={8} 
      loaderProps={{ size: 'xl', color: '#5500FF', variant: 'oval' }}
      overlayOpacity={0.3}
      overlayColor="#b5b5b5" />
        {/* ...other content */}
      </div>
      <Layout className={`${(visible) ? "hidden" : "block"} font-IR`}>
          <div className="font-IR">
            <SelfProduct allProduct={allProduct} product={selfProduct?.selfProduct}/>
          </div>
      </Layout>
      </>
  )
}

export default id