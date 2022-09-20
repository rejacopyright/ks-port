import GoTop from './GoTop'
import Whatsapp from './Whatsapp'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Whatsapp />
      <GoTop />
    </>
  )
}

export default Layout
