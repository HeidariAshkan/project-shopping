import React from 'react'
import Header from '../components/common/Header/Header'
import Footer from '../components/common/Footer/Footer';

interface IProps {
    children: React.ReactNode
    className: string
}


function Layout({children , className}: IProps) {
  return (
    <>
    <div dir="rtl" className={className}>
        <Header/>
          {children}
        <Footer/>
    </div>
    </>
  )
}

export default Layout