import React, { useState } from "react";
import { Checkbox, FormControlLabel, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from 'next/link'

interface IProps {
  open: boolean;
  close: (open: boolean) => void;
}

function ModalLogin({ open, close }: IProps) {
  const [activeEmail, setActiveEmail] = useState<boolean>(false);

  const [activePassword, setActivePassword] = useState<boolean>(false);

  const handleClose = () => {
    close(false);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-[#fefefe] outline-none p-4 w-2/3 rounded-[20px]">
        <div className="text-end">
          <IconButton onClick={handleClose}>
            <CloseIcon className="text-[2.5rem] text-black" />
          </IconButton>
        </div>
        <div className="flex flex-col items-center gap-8">
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
          <div dir="rtl" className="w-2/3">
            <FormControlLabel
              className="m-0"
              control={<Checkbox className="text-[#5500FF]" defaultChecked />}
              label="مرا به خاطر بسپار"
            />
          </div>
          <div className="w-2/3">
            <button className="text-[#fefefe] bg-[#5500FF] hover:bg-opacity-80 transition-all duration-500 w-full py-2 rounded-3xl">
              ورود
            </button>
          </div>
          <div className="w-2/3">
            <Link href='/signup'>
              <button className="text-[#5500FF] bg-[#fefefe] hover:text-opacity-80 transition-all duration-500 w-full py-2 rounded-3xl">
                ثبت نام
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalLogin;
