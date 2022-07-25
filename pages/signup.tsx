import React from "react";
import { useState } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ModalLogin from './../src/components/customs/ModalLogin/ModalLogin';


function SignUp() {
  const [activeEmail, setActiveEmail] = useState<boolean>(false);
  const [activePhoneNumber, setActivePhoneNumber] = useState<boolean>(false);
  const [activePassword, setActivePassword] = useState<boolean>(false);
  const [activeConfirmPassword, setActiveConfirmPassword] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div dir="rtl" className="flex flex-row-reverse justify-center bg-[#fefefe] h-screen" >
      <form className='w-2/4 flex justify-center flex-col items-center gap-6 mt-6'>
        <div
          dir="rtl"
          className="relative border border-[#5500FF] rounded-3xl w-2/3"
        >
          <input
            name="email"
            type="text"
            className={`outline-none w-full bg-transparent text-sm transition-all duration-200 ease-in-out p-2 ${
              activeEmail ? "pt-6" : ""
            }`}
            onChange={(e: any) => {
              setActiveEmail(!!e.target.value);
            }}
          />
          <label
            htmlFor="email"
            className={`absolute top-0 right-0 flex items-center text-[#0000FF] text-opacity-[55%] p-2 transition-all duration-200 ease-in-out ${
              activeEmail ? "text-xs" : "text-sm"
            }`}
          >
            ایمیل
          </label>
        </div>
        <div
          dir="rtl"
          className="relative border border-[#5500FF] rounded-3xl w-2/3"
        >
          <input
            name="phoneNumber"
            type="text"
            className={`outline-none w-full bg-transparent text-sm transition-all duration-200 ease-in-out p-2 ${
              activePhoneNumber ? "pt-6" : ""
            }`}
            onChange={(e: any) => {
              setActivePhoneNumber(!!e.target.value);
            }}
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
          className="relative border border-[#5500FF] rounded-3xl w-2/3"
        >
          <input
            name="password"
            type="password"
            className={`outline-none w-full bg-transparent text-sm transition-all duration-200 ease-in-out p-2 ${
              activePassword ? "pt-6" : ""
            }`}
            onChange={(e: any) => {
              setActivePassword(!!e.target.value);
            }}
          />
          <label
            htmlFor="password"
            className={`absolute top-0 right-0 flex items-center text-[#0000FF] text-opacity-[55%] p-2 transition-all duration-200 ease-in-out ${
              activePassword ? "text-xs" : "text-sm"
            }`}
          >
            رمز عبور
          </label>
        </div>
        <div
          dir="rtl"
          className="relative border border-[#5500FF] rounded-3xl w-2/3"
        >
          <input
            name="passwordRepeat"
            type="password"
            className={`outline-none w-full bg-transparent text-sm transition-all duration-200 ease-in-out p-2 ${
              activeConfirmPassword ? "pt-6" : ""
            }`}
            onChange={(e: any) => {
              setActiveConfirmPassword(!!e.target.value);
            }}
          />
          <label
            htmlFor="passwordRepeat"
            className={`absolute top-0 right-0 flex items-center text-[#0000FF] text-opacity-[55%] p-2 transition-all duration-200 ease-in-out ${
              activeConfirmPassword ? "text-xs" : "text-sm"
            }`}
          >
            تکرار رمز عبور
          </label>
        </div>
        <div className="w-2/3">
          <button className="text-[#fefefe] bg-[#5500FF] hover:bg-opacity-80 transition-all duration-500 w-full py-2 rounded-3xl">
            ثبت نام
          </button>
        </div>
        <div className="w-2/3">
          <button onClick={(e)=>{e.preventDefault();setOpenModal(true);}} className="text-[#5500FF] bg-[#fefefe] hover:text-opacity-80 transition-all duration-500 w-full py-2 rounded-3xl">
            ورود
          </button>
        </div>
      </form>
      <div className="w-2/4 flex flex-col gap-4 bg-[#0000FF] bg-opacity-[55%] text-white p-6 justify-center">
        <div className="flex items-center justify-around">
          <img className="w-24 ml-14" src="https://img.icons8.com/dusk/64/000000/private2.png"/>
          <h1 className='text-3xl ml-14'>امنیت</h1>
        </div>
        <div className="flex items-center justify-around">
          <img className="w-24" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-fast-customer-services-wanicon-lineal-color-wanicon.png"/>
          <h1 className='text-3xl'>سرعت و کیفیت</h1>
        </div>
        <div className="flex items-center justify-around">
          <h1 className='text-3xl mr-[16.875rem]'>را</h1>
        </div>
        <div className="flex items-center justify-around">
          <img className="w-24" src="https://img.icons8.com/external-flat-wichaiwi/64/000000/external-buy-customer-validation-flat-wichaiwi-2.png"/> 
          <h1 className='text-3xl'>با ما تجربه کنید</h1>
        </div>
      </div>
      <ModalLogin open={openModal} close={setOpenModal}/>
    </div>
  );
}

export default SignUp;
