import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Banner from '@components/banner'
import { Sticky } from '@helpers/hooks'
import { detailBanner } from '@api/banner'

const MenuBtn = ({ to = '/services', title = 'Services', active = false }) => {
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
const Title = () => {
  const { scope } = useParams()
  const [title, setTitle] = useState('')
  useEffect(() => {
    let docTitle = 'General Services'
    if (scope === 'general' || !scope) {
      docTitle = 'General Services'
    } else if (scope === 'marine') {
      docTitle = 'Marine Services'
    }
    setTitle(docTitle)
    document.title = `Service | ${docTitle}`
  }, [scope])
  return (
    <div className='flex-center'>
      <div className='fs-3 fw-500'>SERVICES</div>
      {/* <div className='fs-8 fw-500 mx-2'>/</div> */}
      {false && <div className='fs-5 fw-400'>{title}</div>}
    </div>
  )
}
const Index = ({ children }) => {
  const { scope } = useParams()
  const [banner, setBanner] = useState(undefined)
  useEffect(() => {
    detailBanner('services').then(({ data }) => {
      setBanner(data?.file)
    })
  }, [])
  return (
    <>
      <Banner height='160' content={Title} src={banner} />
      <div className='container py-5 w-100' style={{ minHeight: '60vh' }}>
        <div className='row'>
          <div className='col-auto col-md-3 mb-4 mb-md-0'>
            <Sticky>
              <div className='d-flex d-md-block pt-2'>
                <div className='row'>
                  <MenuBtn
                    to='/services'
                    title='General Services'
                    active={scope === 'general' || !scope}
                  />
                  <MenuBtn
                    to='/services/marine'
                    title='Marine Services'
                    active={scope === 'marine'}
                  />
                </div>
              </div>
            </Sticky>
          </div>
          <div className='col-md col-md-9'>{children}</div>
        </div>
      </div>
    </>
  )
}
export default Index
