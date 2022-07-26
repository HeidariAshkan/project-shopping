import React from 'react'
import Header from '../components/common/Header/Header'
import Footer from '../components/common/Footer/Footer';

interface IProps {
    children: React.ReactNode
}


function Layout({children}: IProps) {
  return (
    <>
    <div>
        <Header/>
          {children}
        <Footer/>
    </div>
    </>
  )
}

export default Layout