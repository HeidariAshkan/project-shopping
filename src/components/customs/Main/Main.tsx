import React from 'react'
import SummaryOfProduct from '../SummaryOfProduct/SummaryOfProduct';
import AmazingOffer from './../AmazingOffer/AmazingOffer';


function Main() {

  const res = fetch("http://localhost:8000/store/category").then(res => res.json().then(data => console.log(data)));
  return (
    <div className='flex flex-col items-center mt-8'>
      <AmazingOffer/>
      <SummaryOfProduct/>
      <SummaryOfProduct/>
    </div>
  )
}

export default Main