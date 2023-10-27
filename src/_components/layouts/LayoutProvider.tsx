import Login from '@pages/auth/login'
import { FC, useEffect } from 'react'
import ReactGA from 'react-ga4'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import LayoutAdmin from './LayoutAdmin'
import LayoutPublic from './LayoutPublic'
ReactGA.initialize([
  { trackingId: 'G-G2PV50TLQ6', gaOptions: { queueTime: 0, siteSpeedSampleRate: 100 } },
])
// import { Outlet } from 'react-router-dom'

const Layout: FC<any> = () => {
  const user = useSelector(({ user }) => user)
  const location = useLocation()
  const navigate = useNavigate()
  const isAdminPath = location?.pathname?.startsWith('/admin')
  const isLoginPath = location?.pathname?.startsWith('/login')
  const isLoginTrue = (isLoginPath || isAdminPath) && !user?.token
  const mustRedirectFromLogin = isLoginPath && user?.token
  mustRedirectFromLogin && navigate('/admin')
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location?.pathname,
      title: document.title,
      // hitCallback: () => {
      // },
    })
    // eslint-disable-next-line no-console
    process.env.NODE_ENV === 'production' && console.clear()
    const el = document.querySelector('a[href*="https://pqina.nl"]')
    el && el.remove()
  }, [location?.pathname])
  return <>{isLoginTrue ? <Login /> : isAdminPath ? <LayoutAdmin /> : <LayoutPublic />}</>
}

export default Layout
