import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import GoTop from './GoTop'
import Whatsapp from './Whatsapp'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
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
      <Suspense>
        <Outlet />
      </Suspense>
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
