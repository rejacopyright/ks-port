import { useRouter } from 'next/router'
import GoTop from './GoTop'
import Whatsapp from './Whatsapp'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  const router = useRouter()
  const noError = !['/_error', '/404', '/500'].includes(router?.pathname)
  return (
    <>
      {noError && <Navbar />}
      {children}
      {noError && (
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
