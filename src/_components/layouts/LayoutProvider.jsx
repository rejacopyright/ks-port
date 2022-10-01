import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LayoutAdmin from './LayoutAdmin'
import LayoutPublic from './LayoutPublic'
import Login from '@pages/auth/login'
import ReactGA from 'react-ga'
ReactGA.initialize('UA-243099276-1', {
  debug: window?.process?.env?.NODE_ENV === 'development',
})
// import { Outlet } from 'react-router-dom'

const Layout = () => {
  const user = useSelector(({ user }) => user)
  const location = useLocation()
  const navigate = useNavigate()
  const isAdminPath = location?.pathname?.startsWith('/admin')
  const isLoginPath = location?.pathname?.startsWith('/login')
  const isLoginTrue = (isLoginPath || isAdminPath) && !user?.token
  const mustRedirectFromLogin = isLoginPath && user?.token
  mustRedirectFromLogin && navigate('/admin')
  useEffect(() => {
    ReactGA.pageview(location?.pathname)
    // console.clear()
    const el = document.querySelector('a[href*="https://pqina.nl"]')
    el && el.remove()
  }, [location?.pathname])
  return <>{isLoginTrue ? <Login /> : isAdminPath ? <LayoutAdmin /> : <LayoutPublic />}</>
}

export default Layout
