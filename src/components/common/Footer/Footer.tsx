import React from 'react'
import  Link  from 'next/link';
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsTelegram , BsLinkedin } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { Button } from '@mantine/core';


function Footer() {
  return (
    <div>
        <div className='flex flex-col items-center gap-5'>
            <h1 className='text-2xl font-semibold'>همین حالا عضو ما بشو!</h1>
            <Link href="/signup">
                <Button variant="filled" className='text-xl bg-[#5500FF] text-[#fefefe] w-[158px] h-[55.17px] rounded-md hover:bg-[#fefefe] hover:text-[#5500FF] transition-all duration-500'>شروع کن</Button>
            </Link>
        </div>
        <hr className='my-10 rotate-3 bg-[#5500ff75] h-[2px] sol' />
        <div className='flex justify-around'>
            <div className='p-4'>
                <h1 className='text-3xl font-semibold mb-5'>فروشگاه</h1>
                <p className='w-[24.0625rem] text-sm'>از سال ۱۳۹۶ با هدف ایجاد بستری امن به‌منظور تبادل ارز پایدار تتر با تومان، گامی نو در ارائه سرویس‌های تبادل تتر برداشتیم و پیش‌بردن تمامی فرایندهای تبادل تتر را در کمال هوشمندی و درعین حفظ سادگی برای بهبود مستمر فضای رمزارزی کشور، رسالت خود می‌دانیم.</p>
            </div>
            <div className='flex gap-8'>
                <div className='flex flex-col items-center p-3'>
                    <h1 className='text-2xl font-semibold mb-5'>خدمات</h1>
                    <div className='flex flex-col items-center'>
                        <h5>شرایط و قوانین</h5>
                        <h5>شرایط و قوانین</h5>
                        <h5>شرایط و قوانین</h5>
                        <h5>شرایط و قوانین</h5>
                    </div>
                </div>
                <div className='flex flex-col items-center p-3'>
                    <h1 className='text-2xl font-semibold mb-5'>درباره ما</h1>
                    <div className='flex flex-col items-center'>
                        <h5>تماس باما</h5>
                        <h5>تماس باما</h5>
                        <h5>تماس باما</h5>
                        <h5>تماس باما</h5>
                    </div>
                </div>
                <div className='flex flex-col items-center p-3'>
                    <h1 className='text-2xl font-semibold mb-5'>تماس باما</h1>
                    <div className='flex flex-col items-center gap-3'>
                        <h5>شماره پشتیبانی: 09129545765</h5>
                        <h5>ما را در شبکه های اجتماعی دنبال کنید</h5>
                        <div className='flex gap-5'>
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
