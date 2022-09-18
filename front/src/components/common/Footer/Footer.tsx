import React from 'react'
import  Link  from 'next/link';
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsTelegram , BsLinkedin } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { Button } from '@mantine/core';


function Footer() {
  return (
    <div className='w-full font-IR'>
        <div className='flex flex-col items-center gap-5'>
            <h1 className='text-2xl font-semibold'>همین حالا عضو ما بشو!</h1>
            <Link href="/signup">
                <Button variant="filled" className='text-xl bg-[#5500FF] text-[#fefefe] w-[9.875rem] h-[3.4481rem] rounded-md hover:bg-[#fefefe] hover:text-[#5500FF] transition-all duration-500 font-IR'>شروع کن</Button>
            </Link>
        </div>
        <hr className='my-10 rotate-3 bg-[#5500ff75] h-[2px] sol' />
        <div className='flex justify-around items-center flex-col xl:flex-row'>
            <div className='p-4 flex flex-col items-center lg:w-auto w-2/3 xl:items-start'>
                <h1 className='text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold mb-5'>فروشگاه</h1>
                <p className='w-full text-xs g:w-[24.0625rem] xl:w-[24.0625rem] md:text-sm'>از سال ۱۳۹۶ با هدف ایجاد بستری امن به‌منظور تبادل ارز پایدار تتر با تومان، گامی نو در ارائه سرویس‌های تبادل تتر برداشتیم و پیش‌بردن تمامی فرایندهای تبادل تتر را در کمال هوشمندی و درعین حفظ سادگی برای بهبود مستمر فضای رمزارزی کشور، رسالت خود می‌دانیم.</p>
            </div>
            <div className='flex gap-8 xs:flex-col'>
                <div className='flex flex-col items-center p-3 text-center justify-between flex-1'>
                    <h1 className='xl:text-2xl lg:text-2xl md:text-lg sm:text-lg font-semibold mb-5'>خدمات</h1>
                    <div className='flex flex-col items-center xl:text-lg'>
                        <h5>شرایط و قوانین</h5>
                        <h5>شرایط و قوانین</h5>
                        <h5>شرایط و قوانین</h5>
                        <h5>شرایط و قوانین</h5>
                    </div>
                </div>
                <div className='flex flex-col items-center p-3 text-center justify-between flex-1'>
                    <h1 className='xl:text-2xl lg:text-2xl md:text-lg sm:text-base font-semibold mb-5'>درباره ما</h1>
                    <div className='flex flex-col items-center xl:text-lg'>
                        <h5>تماس باما</h5>
                        <h5>تماس باما</h5>
                        <h5>تماس باما</h5>
                        <h5>تماس باما</h5>
                    </div>
                </div>
                <div className='flex flex-col items-center p-3 text-center justify-between flex-1'>
                    <h1 className='xl:text-2xl lg:text-2xl md:text-lg font-semibold mb-5'>تماس باما</h1>
                    <div className='flex flex-col items-center gap-3 xl:text-lg'>
                        <h5>شماره پشتیبانی: 09129545765</h5>
                        <h5>ما را در شبکه های اجتماعی دنبال کنید</h5>
                        <div className='flex gap-5 xl:text-3xl lg:text-3xl text-2xl'>
                            <RiInstagramFill className='bg-black text-white rounded-lg p-1 cursor-pointer hover:bg-[#5500FF] transition-all duration-500'/>
                            <BsLinkedin  className='bg-black text-white rounded-lg p-1 cursor-pointer hover:bg-[#5500FF] transition-all duration-500'/>
                            <BsTelegram  className='bg-black text-white rounded-lg p-1 cursor-pointer hover:bg-[#5500FF] transition-all duration-500'/>
                            <AiFillTwitterCircle className='bg-black text-white rounded-lg p-1 cursor-pointer hover:bg-[#5500FF] transition-all duration-500'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
