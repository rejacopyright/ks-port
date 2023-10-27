import { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Footer from './Footer'
import GoTop from './GoTop'
import Navbar from './Navbar'
import Whatsapp from './Whatsapp'

const Layout: FC<any> = () => {
  const { pathname } = useLocation()
  const cleanLayout = [
    '/login',
    '/forgot-password',
    '/check-password',
    '/reset-password',
    '/success-password',
  ]?.includes(pathname)
  return (
    <>
      {!cleanLayout && <Navbar />}
      <Outlet />
      {!cleanLayout && (
        <>
          <Footer />
          <Whatsapp />
          <GoTop />
        </>
      )}
    </>
  )
}

export default Layout
