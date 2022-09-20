import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Banner from '@components/banner'
import { Sticky } from '@helpers/hooks'
import { getAbout } from '@api/about'
import { SimpleLoader } from '@components/loader'

const MenuBtn = ({ to = '/about', title = 'About', active = false }) => {
  const [isHover, setIsHover] = useState(false)
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
const Title = ({ title }) => {
  return (
    <div className='flex-center'>
      <div className='fs-3 fw-500'>ABOUT US</div>
      <div className='fs-8 fw-500 mx-2'>/</div>
      <div className='fs-5 fw-400'>{title}</div>
    </div>
  )
}
const Index = ({ children }) => {
  const { scope: path } = useParams()
  const [menus, setMenus] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getAbout()
      .then(({ data: { data } = {} }) => {
        setMenus(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  useEffect(() => {
    const detail = menus?.find(({ scope }) => scope === path) || menus?.[0]
    setTitle(detail?.title)
  }, [path, menus])
  return (
    <>
      <Banner height='160' content={<Title title={title} />} />
      <div className='container py-5' style={{ minHeight: '60vh' }}>
        <div className='row'>
          <div className='col-auto col-md-4 col-lg-3 mb-4 mb-md-0'>
            <Sticky>
              <div className='d-flex d-md-block pt-2'>
                {/* <div className='d-none d-md-block text-primary text-uppercase mb-2'>About Us</div> */}
                {loading ? (
                  <SimpleLoader height={35} count={5} className='col-12 mb-2' />
                ) : (
                  <div className='row'>
                    {menus?.map(({ scope, title }, index) => (
                      <MenuBtn
                        key={index}
                        to={`/about/${scope}`}
                        title={title}
                        active={path === scope || (scope === 'company' && !path)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Sticky>
          </div>
          <div className='col-md col-lg-9'>{children}</div>
        </div>
      </div>
    </>
  )
}
export default Index
