import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { Modal, Button } from "@mantine/core";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { TbDiscount2 } from "react-icons/tb";
import { BsShieldCheck } from "react-icons/bs";
import { GrDeliver } from "react-icons/gr";
import {
  addToCart,
  DecreseToCart,
  removeAllCart,
} from "../../../redux/slice/orderCartSlice";
import { useId } from "@mantine/hooks";
import Cookies from "js-cookie";

interface IProps {
  open: boolean;
  close: (open: boolean) => void;
  products: {
    cart: [];
    status: "idle" | "pending" | "succeeded" | "failed";
  };
}
interface OrderCartState {
  description: string;
  featured: boolean;
  final_price: any;
  id: string;
  main_image: string;
  name: string;
  count?: any;
  idProduct: number;
  options: string | null;
}

function ModalBuy({ open, close, products }: IProps) {
  const [activeName, setActiveName] = useState<boolean>(false);
  const [activePhoneNumber, setActivePhoneNumber] = useState<boolean>(false);
  const [activeAddress, setActiveAddress] = useState<boolean>(false);
  const [activeDiscount, setActiveDiscount] = useState<boolean>(false);
  const [openNotif, setOpenNotif] = useState<boolean>(false);

  // const [discount , setDiscount] = useState<boolean>(ture)
  const [myTotalPrice, setMyTotalPrice] = useState<number | null>(null);
  const [discountValue, setDiscountValue] = useState<number | null | string>(
    null
  );

  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    phoneNumber: Yup.string(),
    address: Yup.string(),
    discount: Yup.string(),
  });

  useEffect(() => {
    if (products.cart.length === 0) {
      close(false);
    }
  }, [products.cart]);

  const handleClose = () => {
    close(false);
    setDiscountValue(null);
  };
  useEffect(() => {
    let total = 0;
    products.cart.forEach((item: any) => {
      total += +item.final_price * +item.count;
    });
    if (discountValue !== null && discountValue !== "") {
      setMyTotalPrice(total - (total * +discountValue) / 100);
    } else {
      setMyTotalPrice(total);
    }
  }, [products.cart, discountValue]);

  const Getdiscount = (values: any) => {
    fetch(`http://localhost:8000/store/coupon/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + Cookies.get("token"),
      },
      body: JSON.stringify({
        code: values,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        // setDiscount(true)
        if (myTotalPrice !== null && data.status !== "failed") {
          console.log(data);
          setDiscountValue(+data.discount);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setDiscountValue('')
      });
  };
  function handleAddresses(id: number, more: string | undefined) {
    // fetch(`http://localhost:8000/store/address/`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Token '+ Cookie.get('token'),
    //   },
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //   })
    /////////////////////////////////////////////////////////////////////////////////////////////
    const myorder = products?.cart.map((item: any) => {
      return {
        product: item.idProduct,
        quantity: item.count,
        data: [
          {
            options: item.options,
            price: item.price,
            image: item.image,
          },
        ],
      };
    });
    const moreData = [
      {
        more: more,
        totalprice: myTotalPrice,
        discount: discountValue,
      },
    ];
    console.log(moreData);
    fetch(`http://localhost:8000/store/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + Cookies.get("token"),
      },
      body: JSON.stringify({
        address: id,
        data: moreData,
        status: "pending",
        products: myorder,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          console.log("send order", data);
          //   setOpenNotif(true)
        } else {
          console.log("something done");
          dispatch(removeAllCart());
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
        // setOpenNotif(true)
      });
  }

  const handleSubmitBuy = (values: any) => {
    // Getdiscount(values)
    fetch("http://localhost:8000/store/address/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + Cookies.get("token"),
      },
      body: JSON.stringify({
        name: values.name,
        phone: values.phoneNumber,
        address: values.address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          console.log("get address", data);
          // setOpenNotif(true)
        } else {
          handleAddresses(data.id, values.moreInfo);
        }
      })
      .catch((err) => {
        console.log(err);
        // setOpenNotif(true)
      });
  };

  return (
    <Modal size="70%" opened={open} onClose={handleClose}>
      <div className="flex justify-between">
        <Formik
          initialValues={{
            name: "",
            phoneNumber: "",
            address: "",
            discount: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitBuy}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="w-2/5 flex justify-center flex-col items-center gap-6 mt-6"
            >
              <div
                dir="rtl"
                className="relative border-[#5500FF] border-b w-2/3"
              >
                <input
                  name="name"
                  type="text"
                  className={`outline-none w-full bg-transparent text-sm transition-all duration-200 ease-in-out p-2 border-none focus:ring-0 ${
                    activeName ? "pt-6" : ""
                  }`}
                  onChange={(e: any) => {
                    setActiveName(!!e.target.value);
                    handleChange(e);
                  }}
                  value={values.name}
                />
                <label
                  htmlFor="name"
                  className={`absolute top-0 right-0 flex items-center text-[#0000FF] text-opacity-[55%] p-2 transition-all duration-200 ease-in-out ${
                    activeName ? "text-xs" : "text-sm"
                  }`}
                >
                  نام
                </label>
              </div>
              <div
                dir="rtl"
                className="relative border-b border-[#5500FF] w-2/3"
              >
                <input
                  name="phoneNumber"
                  type="text"
                  className={`outline-none w-full bg-transparent text-sm transition-all duration-200 ease-in-out p-2 border-none focus:ring-0 ${
                    activePhoneNumber ? "pt-6" : ""
                  }`}
                  onChange={(e: any) => {
                    setActivePhoneNumber(!!e.target.value);
                    handleChange(e);
                  }}
                  value={values.phoneNumber}
                />
                <label
                  htmlFor="phoneNumber"
                  className={`absolute top-0 right-0 flex items-center text-[#0000FF] text-opacity-[55%] p-2 transition-all duration-200 ease-in-out ${
                    activePhoneNumber ? "text-xs" : "text-sm"
                  }`}
                >
                  شماره تلفن
                </label>
              </div>
              <div
                dir="rtl"
                className="relative border-b border-[#5500FF]  w-2/3"
              >
                <textarea
                  name="address"
                  className={`outline-none w-full bg-transparent text-sm transition-all duration-200 ease-in-out p-2 border-none focus:ring-0 ${
                    activeAddress ? "pt-6" : ""
                  }`}
                  onChange={(e: any) => {
                    setActiveAddress(!!e.target.value);
                    handleChange(e);
                  }}
                  value={values.address}
                />
                <label
                  htmlFor="address"
                  className={`absolute top-0 right-0 flex items-center text-[#0000FF] text-opacity-[55%] p-2 transition-all duration-200 ease-in-out ${
                    activeAddress ? "text-xs" : "text-sm"
                  }`}
                >
                  آدرس
                </label>
              </div>
              <div
                dir="rtl"
                className="relative border-b border-[#5500FF]  w-2/3 flex items-center"
              >
                <input
                  name="discount"
                  type="text"
                  className={`outline-none w-full bg-transparent text-sm transition-all duration-200 ease-in-out p-2 border-none focus:ring-0 ${
                    activeDiscount ? "pt-6" : ""
                  }`}
                  onChange={(e: any) => {
                    setActiveDiscount(!!e.target.value);
                    handleChange(e);
                  }}
                  value={values.discount}
                />
                <label
                  htmlFor="discount"
                  className={`absolute top-0 right-0 flex items-center text-[#0000FF] text-opacity-[55%] p-2 transition-all duration-200 ease-in-out ${
                    activeDiscount ? "text-xs" : "text-sm"
                  }`}
                >
                  کد تخفیف
                </label>
                <Button
                  onClick={() => Getdiscount(values.discount)}
                  className="border border-[#EF4056] px-2 py-1 bg-[#EF4056] hover:bg-[#fefefe] hover:text-[#EF4056] text-lg transition-all duration-500 mb-1 "
                >
                  <TbDiscount2 />
                </Button>
              </div>
              <div className="w-2/3">
                <Button
                  type="submit"
                  className="text-[#fefefe] bg-[#5500FF] hover:bg-[#5500FF] hover:bg-opacity-80 transition-all duration-500 w-full py-2 rounded-3xl"
                >
                  ادامه
                </Button>
              </div>
            </form>
          )}
        </Formik>
        <div dir="rtl" className="w-2/4">
          <h1>سبد خرید شما</h1>
          <div className="flex flex-col gap-4">
            {products?.cart.map((item: any) => (
              <div className="flex items-center mt-2 border shadow-md rounded-lg p-2">
                <div className="flex flex-col items-center justify-between w-2/4">
                  <img src={item.main_image} />
                  <div className="flex items-center">
                    <Button
                      onClick={() => {
                        const cart: OrderCartState = {
                          id: useId(item?.id?.toString()),
                          idProduct: item?.id,
                          main_image: item?.main_image,
                          final_price: item?.final_price,
                          name: item?.name,
                          featured: item?.featured,
                          description: item?.description,
                          options: item.options,
                          count: 1,
                        };
                        // console.log(cart)
                        dispatch(addToCart(cart));
                      }}
                      className="bg-[#fefefe] text-[#5500FF] hover:text-[#5500FF] transition-all duration-500"
                      variant="light"
                    >
                      <AiOutlinePlusCircle />
                    </Button>
                    <p className="text-[#5500FF]">{item.count}</p>
                    <Button
                      onClick={() => {
                        const cart: OrderCartState = {
                          id: useId(item?.id?.toString()),
                          idProduct: item?.id,
                          main_image: item?.main_image,
                          final_price: item?.final_price,
                          name: item?.name,
                          featured: item?.featured,
                          description: item?.description,
                          options: item.options,
                          count: 0,
                        };
                        dispatch(DecreseToCart(cart));
                      }}
                      className="bg-[#fefefe] text-[#5500FF] hover:text-[#5500FF] transition-all duration-500"
                      variant="light"
                    >
                      <AiOutlineMinusCircle />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p>{item.description}</p>
                  <div className="flex flex-col gap-2">
                    <p className="flex items-center flex-row-reverse justify-end gap-2 text-xs">
                      آپشن: {item.options}{" "}
                    </p>
                    <p className="flex items-center flex-row-reverse justify-end gap-2 text-gray-400 text-xs">
                      گارانتی اصالت و سلامت فیزیکی کالا{" "}
                      <BsShieldCheck className="text-black" />
                    </p>
                    <p className="flex items-center flex-row-reverse justify-end gap-2 text-gray-400 text-xs">
                      ارسال از ۱ روز کاری دیگر
                      <GrDeliver />
                    </p>
                  </div>
                  <p>
                    {(item.final_price * item.count).toLocaleString("fa-IR")}{" "}
                    تومان
                  </p>
                </div>
              </div>
            ))}
            <div
              className={`bg-[#fefefe] p-2 rounded-lg flex justify-between ${
                products.cart.length > 0 ? "block" : "hidden"
              }`}
            >
              <p>مبلغ قابل پرداخت:</p>
              <p>{myTotalPrice?.toLocaleString("fa-IR")} تومان</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalBuy;
