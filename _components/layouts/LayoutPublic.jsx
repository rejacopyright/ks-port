import GoTop from './GoTop'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <GoTop />
    </>
  )
}

export default Layout
