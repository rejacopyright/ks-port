import { Suspense } from 'react'
import GoTop from './GoTop'
import Whatsapp from './Whatsapp'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
      <Whatsapp />
      <GoTop />
    </>
  )
}

export default Layout
