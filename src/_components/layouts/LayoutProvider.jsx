import { useEffect, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LayoutAdmin from './LayoutAdmin'
import LayoutPublic from './LayoutPublic'
import Login from '@pages/auth/login'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const user = useSelector(({ user }) => user)
  const router = useLocation()
  useEffect(() => {
    // if (!router?.pathname?.startsWith('/admin') && user?.token) {
    //   router.push('/admin')
    // }
  }, [router, user?.token])
  const isAdminPath = router?.pathname?.startsWith('/admin')
  const isLoginPath = router?.pathname?.startsWith('/login')
  const isLoginTrue = (isLoginPath || isAdminPath) && !user?.token
  const mustRedirectFromLogin = isLoginPath && user?.token
  mustRedirectFromLogin && router.push('/admin')
  return (
    <Suspense>
      {isLoginTrue ? (
        <Login />
      ) : isAdminPath ? (
        <LayoutAdmin>
          <Outlet />
        </LayoutAdmin>
      ) : (
        <LayoutPublic>
          <Outlet />
        </LayoutPublic>
      )}
    </Suspense>
  )
}

export default Layout
