import React, { useState } from "react";
import { Button, Modal ,Checkbox } from '@mantine/core';
import { GrClose } from 'react-icons/gr';
import Link from 'next/link'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Notification } from '@mantine/core';
import { AiFillCloseCircle } from "react-icons/ai";
import Cookies from 'js-cookie'
import Styles from '../../../../styles/ModalLogin.module.css'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { checkAdmin } from "../../../redux/slice/isAdminSlice";


interface IProps {
  open: boolean;
  close: (open: boolean) => void;
}

function ModalLogin({ open, close }: IProps) {
  const [activeEmail, setActiveEmail] = useState<boolean>(false);

  const [activePassword, setActivePassword] = useState<boolean>(false);
  const [openNotif , setOpenNotif] = useState<boolean>(false)
  const [token , setToken] = useState<string>('')

  const router = useRouter()
  const dispatch = useDispatch()
  const handleClose = () => {
    close(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('این فیلد الزامی است'),
    // .email('ایمیل معتبر نمی باشد').required('این فیلد الزامی است').matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,'ایمیل معتبر نمی باشد'),
    password: Yup.string().required('این فیلد الزامی است'),
    // .min(6, 'باید بیش تر از 6 کاراکتر باشد').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character'),
    remember: Yup.boolean(),
  });

  const notficationStyle = ()=>{
    setTimeout(()=>{
      setOpenNotif(false)
    },5000)
    setOpenNotif(true)
  }

  function handleLogin(values: any) {
    fetch('http://localhost:8000/user/login/', {
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
      console.log(data)
      if(data.userInfo?.is_superuser){
        dispatch(checkAdmin(data.userInfo.is_superuser))
        setToken(data.token);
      }
    // console.log(data)
    // cookie
    Cookies.set('token', data.token, { expires: 1 , path: '/' , sameSite: 'strict' , secure: true, domain: 'localhost'});
    if(data.status === 'failed'){
    notficationStyle()
    }else{
      (router.pathname === "/signup") ? router.push('/') : ""
      close(false)
      // router.push('/')
    }
    })
    }

  
  return (
    <Modal size="xl" opened={open} onClose={handleClose}>
      <div className="bg-[#fefefe] outline-none p-4 w-2/3 rounded-[20px] mx-auto">
        <Formik
          initialValues={{
            email: '',
            password: '',
            remember: false
          }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
        >

          {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
              <Notification className={[Styles.animateOpen,`text-end w-2/3 ${(openNotif) ? "" : "hidden"}`].join(" ")} icon={<AiFillCloseCircle />} color="red" title="لاگین">
            {/* `text-end absolute top-2 left-2/4 right-2/4 -translate-x-2/4 w-2/3 mb-4 ${(openNotif) ? "" : "hidden"}` */}
               رمز عبور یا ایمیل شما اشتباه است
              </Notification>
            <div
              dir="rtl"
              className="relative border-b border-[#5500FF] w-2/3"
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
              {touched.email && errors.email && <div dir="rtl" className="text-red-500 text-start w-full mr-36">{errors.email}</div>}
            <div
              dir="rtl"
              className="relative border-b border-[#5500FF] w-2/3"
              >
              <input
                name="password"
                type="password"
                className={`outline-none w-full bg-transparent text-sm transition-all duration-200 ease-in-out p-2 border-none focus:ring-0 ${
                  activePassword ? "pt-6" : ""
                }`}
                value={values.password}
                onChange={(e: any) => {
                  setActivePassword(!!e.target.value);
                  handleChange(e);
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
            {touched.password && errors.password && <div dir="rtl" className="text-red-500 text-start w-full mr-36">{errors.password}</div>}
            <div dir="rtl" className="w-2/3">
              <Checkbox name="remember" label="مرا به خاطر بسپار" className="text-[#5500FF]" defaultChecked />
            </div>
            <div className="w-2/3">
              <Button type="submit" className="text-[#fefefe] bg-[#5500FF] hover:bg-[#5500FF]  hover:bg-opacity-80 transition-all duration-500 w-full py-2 rounded-3xl">
                ورود
              </Button>
            </div>
            <div className="w-2/3">
              <Link href='/signup'>
                <Button variant="subtle" className="text-[#5500FF] bg-[#fefefe] hover:text-opacity-80 transition-all duration-500 w-full py-2 rounded-3xl">
                  ثبت نام
                </Button>
              </Link>
            </div>
          </form>
        )} 
        </Formik>
      </div>
    </Modal>
    
  );
}

export default ModalLogin;
