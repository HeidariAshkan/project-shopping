import React , {useCallback} from 'react'
import { useId } from '@mantine/hooks';
import { useDispatch } from 'react-redux';
import { Button } from "@mantine/core";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { addToCart, DecreseToCart , removeAllCart } from '../../../redux/slice/orderCartSlice';
import Cookies from 'js-cookie'


interface OrderCartState {
  description: string;
  featured: boolean;
  final_price: any;
  id: string;
  main_image: string;
  name: string;
  count?: any;
  idProduct:number
  options:string | null
}

interface IProps {
  products:{
    cart:[],
    status:'idle'|'pending'|'succeeded'|'failed'
  }
  open:boolean
  SetOpenModalBuy:(open:boolean)=>void
  setOpenModalLogin:(open:boolean)=>void
}
function Cart({open , products , SetOpenModalBuy , setOpenModalLogin}:IProps) {

  const dispatch = useDispatch();

  const totalPrice = useCallback(()=>{
    let total = 0;
    products.cart.forEach((item:any) => {
      total += +(item.final_price) * +(item.count);
    });
    return total;
  },[products.cart])


  return (
    <div className={`absolute top-10 left-1 flex flex-col gap-2 p-4 rounded-lg border w-96 transition-all duration-500 bg-[#0000FF] bg-opacity-70 ${(open) ? "block" : "hidden"}`}>
      {(products.cart.length > 0) ? products.cart.map((item:any) => (
        <div key={item.id} className='flex flex-row-reverse justify-between border rounded-md p-2 shadow-sm bg-[#fefefe]'>
          <img className='rounded-lg w-24' src={item.main_image} alt="" />
          <div className='flex flex-col justify-center items-center gap-1'>
            <div className="flex items-center gap-2">
              <p className='text-xs'>{item.name}:</p>
              <p className='text-md'>{item.options}</p>
            </div>
            <div className='flex items-center'>
            <Button onClick={()=>{
                const cart:OrderCartState = {
                  id:useId(item?.id?.toString()),
                  idProduct:item?.id,
                  main_image:item?.main_image,
                  final_price:item?.final_price,
                  name:item?.name,
                  featured:item?.featured,
                  description:item?.description,
                  options:item.options,
                  count:1,
                }
                console.log(cart)
                  dispatch(addToCart(cart))
                }} className="bg-[#fefefe] text-[#5500FF] hover:text-[#5500FF] transition-all duration-500" variant="light">
              <AiOutlinePlusCircle/>
            </Button>
            <p className="text-[#5500FF]">{item.count}</p>
            <Button onClick={()=>{
                  const cart:OrderCartState = {
                  id:useId(item?.id?.toString()),
                  idProduct:item?.id,
                  main_image:item?.main_image,
                  final_price:item?.final_price,
                  name:item?.name,
                  featured:item?.featured,
                  description:item?.description,
                  options:item.options,
                  count:0,
                  }
                 dispatch(DecreseToCart(cart))
                                              
                }} className="bg-[#fefefe] text-[#5500FF] hover:text-[#5500FF] transition-all duration-500"  variant="light">
              <AiOutlineMinusCircle/>
            </Button>
            </div>
            <div>
              <p>{(item.final_price * item.count).toLocaleString('fa-IR')} تومان</p>
            </div>
          </div>
        </div>
      )) : <p className="text-center text-white">نتیجه ای یافت نشد</p>}
      <div className={`bg-[#fefefe] p-2 rounded-lg flex justify-between ${(products.cart.length > 0) ? 'block' : 'hidden'}`}>
          <p>مبلغ قابل پرداخت:</p>
          <p>{totalPrice().toLocaleString('fa-IR')} تومان</p>
      </div>
      
        <Button onClick={()=>{(!Cookies.get('token') ? setOpenModalLogin(true) : SetOpenModalBuy(true))}} variant="outline" className={`text-green-500 hover:text-white hover:bg-green-500 border-green-500 transition-all duration-500 ${((products.cart.length > 0) ? 'block' : 'hidden')}`}>ادامه خرید</Button>
        <Button onClick={()=>{dispatch(removeAllCart())}} variant="outline" className={`text-red-500 hover:text-white hover:bg-red-500 border-red-500 transition-all duration-500 ${((products.cart.length > 0) ? 'block' : 'hidden')}`}><BsTrashFill/></Button>

    </div>
  )
}

export default Cart





