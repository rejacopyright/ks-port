import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Banner from '@components/banner'
import { Sticky } from '@helpers/hooks'

const MenuBtn = ({ to = '/services', title = 'Services', active = false }) => {
  const [isHover, setIsHover] = useState(false)
  useEffect(() => {
    setIsHover(active)
  }, [active])
  return (
    <div className='col-auto col-md-12 mb-1'>
      <Link href={to} scroll={false}>
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
const Title = () => {
  const { asPath } = useRouter()
  const [title, setTitle] = useState()
  useEffect(() => {
    setTitle(document?.querySelector('title')?.innerText)
  }, [asPath])
  return (
    <div className='flex-center'>
      <div className='fs-3 fw-500'>SERVICES</div>
      <div className='fs-8 fw-500 mx-2'>/</div>
      <div className='fs-5 fw-400'>{title}</div>
    </div>
  )
}
const Index = ({ children }) => {
  const { asPath } = useRouter()
  return (
    <>
      <Banner height='160' content={Title} />
      <div className='container py-5' style={{ minHeight: '60vh' }}>
        <div className='row'>
          <div className='col-auto col-lg-3 mb-4 mb-md-0'>
            <Sticky>
              <div className='d-flex d-md-block pt-2'>
                <div className='row'>
                  <MenuBtn
                    to='/services'
                    title='General Services'
                    active={asPath === '/services'}
                  />
                  <MenuBtn
                    to='/services/marine'
                    title='Marine Services'
                    active={asPath === '/services/marine'}
                  />
                </div>
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
