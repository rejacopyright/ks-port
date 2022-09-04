import { useRouter } from 'next/router'
import GoTop from './GoTop'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  const router = useRouter()
  console.log()
  return (
    <>
      {router?.pathname !== '/404' && <Navbar />}
      {children}
      {router?.pathname !== '/404' && (
        <>
          <Footer />
          <GoTop />
        </>
      )}
    </>
  )
}

export default Layout
