import React, { useState, useMemo } from "react";
import { BiCheckShield, BiCoinStack } from "react-icons/bi";
import { Button } from "@mantine/core";
import { Select } from "@mantine/core";
import { AiOutlineCheck , AiFillStar, AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Link from "next/link";
import { useHorizontalScroll } from './../../../utils/useHorizontalScroll';
import { useDispatch , useSelector } from 'react-redux';
import { addToCart , DecreseToCart } from "../../../redux/slice/orderCartSlice";
import { useId } from '@mantine/hooks';

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
  product: {
    attributes?: [];
    category: number;
    description: string;
    extra_information?: [];
    featured: boolean;
    final_price: any;
    id: number;
    images: string;
    main_image: string;
    name: string;
    options?: { name: string; value: [] };
    price: any;
    remaining: number;
    slug: string;
  };
  allProduct: {
    product: [];
    status: "idle" | "pending" | "succeeded" | "failed";
  };
}
function SelfProduct({ product, allProduct }: IProps) {
  const [optionsPicked, setOptionsPicked] = useState<string | null>(null);
  const scrollRef = useHorizontalScroll();
  const dispatch = useDispatch()

  const cart = useSelector((store:any)=>store.orderCartSlice.cart)
  // console.log(cart)
  // console.log(optionsPicked)

  const optionsSelect = useMemo(() => {
    if (product.options) {
      setOptionsPicked(null)
      return product?.options?.value.map((item: any) => item.toString());
    } else {
      return [];
    }
  }, [product]);

  const sameLikeProduct = useMemo(() => {
    if (allProduct.product) {
      return allProduct.product.filter(
        (item: any) => item.category === product.category && item.id !== product.id
      );
    } else {
      return [];
    }
  }, [allProduct]);

  return (
    <div className="my-10">
      <div className="flex">
        <div className="w-2/4 mx-3">
          <img className="rounded-lg" src={product?.main_image} alt="pic" />
          <div className="flex justify-center w-full">
            <button className="border rounded-lg w-2/6 hover:shadow-2xl hover:w-2/4 transition-all duration-1000">
              <img className="rounded-lg" src={product.images} alt="pic" />
            </button>
          </div>
        </div>
        <div className="w-4/5">
          <div>
            <h1 className="xl:text-3xl lg:text-2xl md:text-lg sm:text-lg font-bold mb-4">
              {product?.name}
            </h1>
            <p className="xl:text-2xl lg:text-lg md:tex-lg sm:text-md">
              {product?.description}
            </p>
          </div>
          <div className="flex justify-around relative w-full">
            <div className="flex flex-col justify-between gap-5 w-2/4">
              <div className="flex gap-3 items-center mt-4">
                <p className="text-lg">{product?.options?.name}:</p>
                {product?.options?.value.map((item: any) => (
                  <button
                    key={item}
                    onClick={() => {
                      setOptionsPicked(item.toString());
                    }}
                    className={`p-4 rounded-full text-white ${
                      item === "آبی"
                        ? "bg-blue-600"
                        : item === "مشکی"
                        ? "bg-slate-700"
                        : item === "قرمز"
                        ? "bg-red-600"
                        : item === "سبز"
                        ? "bg-green-600"
                        : item === "طلایی"
                        ? "bg-yellow-600"
                        : item === "سفید"
                        ? "bg-gray-200"
                        : item === "خاکستری"
                        ? "bg-gray-500"
                        : item === "نقره ای"
                        ? "bg-gray-700"
                        : "bg-slate-900"
                    }`}
                  >
                    {product?.options?.name !== "رنگ" ? item : ""}
                    <AiOutlineCheck
                      className={`${
                        item.toString() === optionsPicked ? "block" : "hidden"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg">امتیاز:</p>
                <div className="flex text-yellow-500">
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                </div>
              </div>
              <div className="flex items-center justify-evenly">
                <img src="https://img.icons8.com/nolan/64/shop.png"/>
                <img src="https://img.icons8.com/nolan/64/delivery.png"/>
                <img src="https://img.icons8.com/nolan/64/online-order.png"/>
              </div>
              <p className="text-xs w-full">
                هشدار سامانه همتا: در صورت انجام معامله، از فروشنده کد فعالسازی
                را گرفته و حتما در حضور ایشان، دستگاه را از طریق #7777*، برای
                سیمکارت خود فعالسازی نمایید. آموزش تصویری در آدرس اینترنتی
                hmti.ir/06 امکان برگشت کالا در گروه موبایل با دلیل "انصراف از
                خرید" تنها در صورتی مورد قبول است که پلمب کالا باز نشده باشد.
                تمام گوشی‌های دیجی‌کالا ضمانت رجیستری دارند. در صورت وجود مشکل
                رجیستری، می‌توانید بعد از مهلت قانونی ۳۰ روزه، گوشی خریداری‌شده
                را مرجوع کنید.
              </p>
            </div>
            <div className="flex flex-col p-4 border border-[#5500FF] rounded-md w-2/6 text-center gap-2 mt-4 justify-between">
              <p className="text-md text-[#EF4056] text-start">
                {product.featured === true ? "فروش ویژه" : ""}
              </p>
              <Select
                placeholder="انتخاب"
                data={optionsSelect}
                value={optionsPicked}
                onChange={setOptionsPicked}
              />
              <p className="text-xs lg:text-md xl:text-md flex items-center flex-row-reverse gap-2 justify-center p-1 w-full border rounded-md text-green-600">
                گارانتی ۱۸ ماهه همراه گستر نقره فام{" "}
                <BiCheckShield className="text-xl text-black" />
              </p>
              <p className="text-xs lg:text-md xl:text-md flex items-center flex-row-reverse gap-2 justify-center p-1 w-full border rounded-md text-slate-900">
                {" "}
                150 امتیاز از طرف ما به شما{" "}
                <BiCoinStack className="text-xl text-yellow-600" />
              </p>
              <div className=" flex justify-start gap-2 flex-row-reverse items-center">
                <span
                  className={`bg-[#EF4056] text-white px-2 rounded-3xl text-sm ${
                    product.featured ? "block" : "hidden"
                  }`}
                >
                  {product.featured
                    ? 100 -
                      +((product.final_price * 100) / product.price).toFixed()
                    : ""}
                  %
                </span>
                <p className="text-xs line-through text-gray-500">
                  {product.featured
                    ? parseInt(product.price).toLocaleString("fa-IR")
                    : ""}
                </p>
              </div>
              <p
                className={`text-md text-end ${product.featured ? "ml-4" : ""}`}
              >
                {parseInt(product?.final_price).toLocaleString("fa-IR")}
              </p>
              {
                    (cart?.find((item:any)=>item.idProduct === product.id && item.options === optionsPicked)?.count > 0) ?
                      
                        <div className="flex justify-center text-black items-center gap-4">
                          <Button onClick={()=>{
                          if(optionsPicked !== null){
                          const cart:OrderCartState = {
                            id:useId(product?.id?.toString() + optionsPicked),
                            idProduct:product?.id,
                            main_image:product?.main_image,
                            final_price:product?.final_price,
                            name:product?.name,
                            featured:product?.featured,
                            description:product?.description,
                            options:optionsPicked,
                            count:1,
                          }
                          dispatch(addToCart(cart))
                        }
                        else{
                          return alert('Please select options')
                        }}} className="bg-[#fefefe] text-[#5500FF] hover:text-[#5500FF] transition-all duration-500" variant="light">
                            <AiOutlinePlusCircle/>
                          </Button>
                          <p className="text-[#5500FF]">{cart?.find((item:any)=>item.idProduct === product.id && item.options === optionsPicked).count}</p>
                          <Button onClick={()=>{
                              const cart:OrderCartState = {
                                id:useId(product?.id?.toString() + optionsPicked),
                                idProduct:product?.id,
                                main_image:product?.main_image,
                                final_price:product?.final_price,
                                name:product?.name,
                                featured:product?.featured,
                                description:product?.description,
                                options:optionsPicked,
                                count:0,
                                }
                                dispatch(DecreseToCart(cart))
                                              
                          }} className="bg-[#fefefe] text-[#5500FF] hover:text-[#5500FF] transition-all duration-500"  variant="light">
                            <AiOutlineMinusCircle/>
                          </Button>
                        </div>
                        :
                        <Button
                        variant="light"
                        onClick={()=>{
                          if(optionsPicked !== null){
                          const cart:OrderCartState = {
                            id:useId(product?.id?.toString() + optionsPicked),
                            idProduct:product?.id,
                            main_image:product?.main_image,
                            final_price:product?.final_price,
                            name:product?.name,
                            featured:product?.featured,
                            description:product?.description,
                            options:optionsPicked,
                            count:1,
                          }
                          dispatch(addToCart(cart))
                        }
                        else{
                          return alert('Please select options')
                        }
                      }}
                        className="bg-[#5500FF] text-white hover:bg-opacity-10 hover:text-[#5500FF] transition-all duration-500"
                      >
                        افزودن به سبد
                      </Button>
              }
            </div>
          </div>
          <div  className="mt-16 p-4 border rounded flex flex-col gap-4 overflow-x-auto">
            <h1>کالا های مشابه:</h1>
            <div ref={scrollRef} className="p-4 flex gap-4 overflow-auto">
              {sameLikeProduct.slice(0, 5).map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between p-4 border border-[#5500FF] rounded-md gap-2 w-full"
                >
                  <img src={item.main_image} />
                  <div
                    className="flex flex-col items-center gap-2 text-sm"
                    dir="rtl"
                  >
                    <p className="text-xs">
                      {parseInt(item.final_price).toLocaleString("fa-IR")} تومان
                    </p>
                    <Link href={`/products/${item.id}`}>
                      <Button
                        variant="filled"
                        className="bg-[#5500FF] text-white px-6 py-1 hover:text-[#5500FF] hover:bg-[#fefefe] transiton-all duration-500 rounded-md hover:border-[#5500FF] hover:border"
                      >
                        خرید
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelfProduct;
