import { useState } from 'react'
import Navbar from './admin/Navbar'
import Sidebar from './admin/Sidebar'
import { expandAdmin as expand } from '@helpers/config'
const Layout = ({ children }) => {
  const [navHeight, setNavHeight] = useState(0)
  return (
    <>
      <Navbar expand={expand} thisHeight={setNavHeight} />
      <div className='container'>
        <div className='row'>
          <div className={`col-auto d-none d-${expand}-block`}>
            <div className='sticky-top py-3' style={{ top: navHeight }}>
              <Sidebar />
            </div>
          </div>
          <div className={`col-md-8 col-lg-9 py-2 py-${expand}-3`}>{children}</div>
        </div>
      </div>
    </>
  )
}

export default Layout
