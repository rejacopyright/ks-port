import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LayoutAdmin from './LayoutAdmin'
import LayoutPublic from './LayoutPublic'
import Login from '@pages/auth/login'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const user = useSelector(({ user }) => user)
  const router = useLocation()
  const isAdminPath = router?.pathname?.startsWith('/admin')
  const isLoginPath = router?.pathname?.startsWith('/login')
  const isLoginTrue = (isLoginPath || isAdminPath) && !user?.token
  const mustRedirectFromLogin = isLoginPath && user?.token
  mustRedirectFromLogin && router.push('/admin')
  return (
    <>
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
    </>
  )
}

export default Layout