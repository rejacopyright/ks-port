import { expandAdmin as expand } from '@helpers'
import { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './admin/Navbar'
import Sidebar from './admin/Sidebar'
const Layout: FC<any> = () => {
  const [navHeight, setNavHeight] = useState<any>(0)
  return (
    <>
      <Navbar expand={expand} thisHeight={setNavHeight} />
      <div className='container'>
        <div className='row'>
          <div className={`col-md-4 col-lg-3 d-none d-${expand}-block`}>
            <div className='sticky-top py-3' style={{ top: navHeight }}>
              <Sidebar />
            </div>
          </div>
          <div className={`col-md-8 col-lg-9 py-2 py-${expand}-3`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
