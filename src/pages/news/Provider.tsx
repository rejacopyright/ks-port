import { detailBanner } from '@api/banner'
import Banner from '@components/banner'
import { Sticky } from '@helpers'
import { FC, useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const MenuBtn: FC<any> = ({ to = '/news', title = 'News', active = false }) => {
  const [isHover, setIsHover] = useState<any>(false)
  useEffect(() => {
    setIsHover(active)
  }, [active])
  return (
    <div className='col-auto col-md-12 mb-1'>
      <Link to={to}>
        <div
          className={`pointer py-2 px-3 flex-between fw-500 rounded mb-1 ${
            isHover ? 'bg-primary text-white' : 'bg-light-primary text-primary'
          }`}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(active || false)}
        >
          <span>{title}</span>
          <i className='las la-angle-right d-none d-md-block' />
        </div>
      </Link>
    </div>
  )
}
const Title: FC<any> = () => {
  const { pathname } = useLocation()
  const [title, setTitle] = useState<any>()
  useEffect(() => {
    let docTitle: any = 'Media'
    if (pathname === '/news' || pathname?.startsWith('/news/media')) {
      docTitle = 'Media'
      document.title = 'News'
    } else if (pathname?.startsWith('/news/carreer')) {
      docTitle = 'Carreer'
      document.title = 'Carreer'
    }
    setTitle(docTitle)
  }, [pathname])
  return (
    <div className='flex-center'>
      <div className='fs-3 fw-500'>NEWS</div>
      {/* <div className='fs-8 fw-500 mx-2'>/</div> */}
      {false && <div className='fs-5 fw-400'>{title}</div>}
    </div>
  )
}
const Index: FC<any> = () => {
  const { pathname } = useLocation()
  const [banner, setBanner] = useState<any>(undefined)
  useEffect(() => {
    detailBanner('news').then(({ data }) => {
      setBanner(data?.file)
    })
  }, [])
  return (
    <>
      <Banner height='200' content={Title} src={banner} />
      <div className='container py-5 w-100' style={{ minHeight: '60vh' }}>
        <div className='row'>
          <div className='col-auto col-md-3 mb-4 mb-md-0'>
            <Sticky>
              <div className='d-flex d-md-block pt-2'>
                <div className='row'>
                  <MenuBtn
                    to='/news'
                    title='Media'
                    active={['/news', '/news/media']?.includes(pathname)}
                  />
                  <MenuBtn
                    to='/news/carreer'
                    title='Carreer'
                    active={pathname === '/news/carreer'}
                  />
                </div>
              </div>
            </Sticky>
          </div>
          <div className='col-md col-md-9'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
export default Index
