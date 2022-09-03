import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import LayoutAdmin from './LayoutAdmin'
import LayoutPublic from './LayoutPublic'
import Login from '@pages/auth/login'

const Layout = ({ children }) => {
  const user = useSelector(({ user }) => user)
  const router = useRouter()
  useEffect(() => {
    // if (!router?.pathname?.startsWith('/admin') && user?.token) {
    //   router.push('/admin')
    // }
  }, [router, user?.token])
  const isAdminPath = router?.pathname?.startsWith('/admin')
  const isLoginTrue = isAdminPath && !user?.token
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <title>Title</title>
      </Head>
      {isLoginTrue ? (
        <Login />
      ) : isAdminPath ? (
        <LayoutAdmin>{children}</LayoutAdmin>
      ) : (
        <LayoutPublic>{children}</LayoutPublic>
      )}
    </>
  )
}

export default Layout
