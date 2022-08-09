import React from "react";
import { useState } from "react";
import ModalLogin from './../src/components/customs/ModalLogin/ModalLogin';
import { Button } from '@mantine/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Notification } from '@mantine/core';
import { AiFillCloseCircle } from "react-icons/ai";

function SignUp() {
  const [activeEmail, setActiveEmail] = useState<boolean>(false);
  const [activePhoneNumber, setActivePhoneNumber] = useState<boolean>(false);
  const [activePassword, setActivePassword] = useState<boolean>(false);
  const [activeConfirmPassword, setActiveConfirmPassword] = useState<boolean>(false);
  const [token , setToken] = useState<string>('')
  const [openNotif , setOpenNotif] = useState<boolean>(false)


  const [openModal, setOpenModal] = useState<boolean>(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('ایمیل معتبر نمی باشد').required('این فیلد الزامی است').matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,'ایمیل معتبر نمی باشد'),
    password: Yup.string().required('این فیلد الزامی است').min(6, 'باید بیش تر از 6 کاراکتر باشد').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,'پسورد شما باید شامل حروف کوچک و بزرگ و اعداد و کاراکترهای خاص باشد'),
    phoneNumber: Yup.string().required('این فیلد الزامی است').matches(/^[0-9]{10}$/,'شماره موبایل معتبر نمی باشد'),
    passwordRepeat: Yup.string().when('password',{
      is: (val:any) => (val && val.length > 0),
      then: Yup.string().required('این فیلد الزامی است').oneOf([Yup.ref('password')], 'پسورد شما با بالایی یکی نمیباشد')
    })
  });

  function handlesubmitRegister(values: any) {
    fetch('http://localhost:8000/user/register/', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    username: values.email,
    password: values.password
    })
    })
    .then(response => response.json())
    .then(data => {
    setToken(data.token);
    // Cookies.set('token', data.token);
    if(data.status === 'failed'){
    setOpenNotif(true)
    }else{
    setOpenModal(true)
    }})}
  return (
    <div dir="rtl" className="flex flex-row-reverse justify-center bg-[#fefefe] h-screen" >
    <Formik
      initialValues={{
        email: '',
        password: '',
        phoneNumber: '',
        passwordRepeat: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handlesubmitRegister}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
      <form onSubmit={handleSubmit} className='w-2/4 flex justify-center flex-col items-center gap-6 mt-6'>
        <div
          dir="rtl"
          className="relative border border-[#5500FF] rounded-3xl w-2/3"
          >
          <input
            name="email"
            type="text"
                className={`outline-none w-full bg-transparent text-sm transition-all duration-200 ease-in-out p-2 border-none focus:ring-0 ${
                  activeEmail ? "pt-6" : ""
                }`}
            onChange={(e: any) => {
              setActiveEmail(!!e.target.value);
              handleChange(e);
            }}
            value={values.email}
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
        {touched.email && errors.email && <div dir="rtl" className="text-red-500 text-start w-full mr-52">{errors.email}</div>}
        <div
          dir="rtl"
          className="relative border border-[#5500FF] rounded-3xl w-2/3"
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
        {touched.phoneNumber && errors.phoneNumber && <div dir="rtl" className="text-red-500 text-start w-full mr-52">{errors.phoneNumber}</div>}
        <div
          dir="rtl"
          className="relative border border-[#5500FF] rounded-3xl w-2/3"
          >
          <input
            name="password"
            type="password"
            className={`outline-none w-full bg-transparent text-sm transition-all duration-200 ease-in-out p-2 border-none focus:ring-0 ${
              activePassword ? "pt-6" : ""
            }`}
            onChange={(e: any) => {
              setActivePassword(!!e.target.value);
              handleChange(e);
            }}
            value={values.password}
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
        {touched.password && errors.password && <div dir="rtl" className="text-red-500 text-start w-full mr-52">{errors.password}</div>}
        <div
          dir="rtl"
          className="relative border border-[#5500FF] rounded-3xl w-2/3"
          >
          <input
            name="passwordRepeat"
            type="password"
            className={`outline-none w-full bg-transparent text-sm transition-all duration-200 ease-in-out p-2 border-none focus:ring-0 ${
              activeConfirmPassword ? "pt-6" : ""
            }`}
            onChange={(e: any) => {
              setActiveConfirmPassword(!!e.target.value);
              handleChange(e);
            }}
            value={values.passwordRepeat}
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
        {touched.passwordRepeat && errors.passwordRepeat && <div dir="rtl" className="text-red-500 text-start w-full mr-52">{errors.passwordRepeat}</div>}
        <div className="w-2/3">
          <Button type="submit" className="text-[#fefefe] bg-[#5500FF] hover:bg-[#5500FF] hover:bg-opacity-80 transition-all duration-500 w-full py-2 rounded-3xl">
            ثبت نام
          </Button>
        </div>
        <div className="w-2/3">
          <Button variant="subtle" onClick={()=>{setOpenModal(true);}} className="text-[#5500FF] bg-[#fefefe] hover:text-opacity-80 transition-all duration-500 w-full py-2 rounded-3xl">
            ورود
          </Button>
        </div>
        <Notification className={`text-start ${(openNotif) ? "" : "hidden"}`} icon={<AiFillCloseCircle />} color="red" title="لاگین">
              رمز عبور یا ایمیل شما اشتباه است
        </Notification>
      </form>
      )}
    </Formik>
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
