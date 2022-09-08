import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Banner from '@components/banner'
import { Sticky } from '@helpers/hooks'

const MenuBtn = ({ to = '/about', title = 'About', active = false }) => {
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
      <div className='fs-3 fw-500'>ABOUT US</div>
      <div className='fs-8 fw-500 mx-2'>/</div>
      <div className='fs-5 fw-400'>{title}</div>
    </div>
  )
}
const Index = ({ children }) => {
  const { asPath } = useRouter()
  return (
    <>
      <Banner height='100' content={Title} />
      <div className='container py-5' style={{ minHeight: '60vh' }}>
        <div className='row'>
          <div className='col-md-4 mb-4 mb-md-0'>
            <Sticky>
              <div className='d-flex d-md-block pt-2'>
                {/* <div className='d-none d-md-block text-primary text-uppercase mb-2'>About Us</div> */}
                <div className='row'>
                  <MenuBtn to='/about' title='Company Profile' active={asPath === '/about'} />
                  <MenuBtn
                    to='/about/history'
                    title='History'
                    active={asPath === '/about/history'}
                  />
                  <MenuBtn
                    to='/about/vision'
                    title='Vision, Mission & Values'
                    active={asPath === '/about/vision'}
                  />
                  <MenuBtn
                    to='/about/organization'
                    title='Organization Structure'
                    active={asPath === '/about/organization'}
                  />
                  <MenuBtn
                    to='/about/certification'
                    title='Certification'
                    active={asPath === '/about/certification'}
                  />
                  <MenuBtn
                    to='/about/management'
                    title='Management'
                    active={asPath === '/about/management'}
                  />
                </div>
              </div>
            </Sticky>
          </div>
          <div className='col-md-8'>{children}</div>
        </div>
      </div>
    </>
  )
}
export default Index
