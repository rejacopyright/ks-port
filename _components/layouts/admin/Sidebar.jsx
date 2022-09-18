import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'

const itemClass = 'flex-start dropdown-item text-dark fw-500 p-2 pointer'
const CustomToggle = ({ children, eventKey, isActive, setActiveKey = () => '', icon = 'home' }) => {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    setActiveKey(isActive ? undefined : eventKey)
  )
  return (
    <div className={`flex-between ${itemClass}`} onClick={decoratedOnClick}>
      {!!icon && <i className={`las la-${icon} fs-6 me-2`} />}
      <span>{children}</span>
      <i className={`las la-angle-${isActive ? 'down' : 'right'} ms-auto`} />
    </div>
  )
}
const Index = () => {
  const { asPath: path } = useRouter()
  const [activeKey, setActiveKey] = useState(path)
  const toggleMenuList = ['/admin/home', '/admin/about', '/admin/news', '/admin/services']
  return (
    <div className='row'>
      <div className='col-12'>
        <div className='bg-white p-2 radius-10' style={{ minWidth: 200 }}>
          <Accordion
            defaultActiveKey={toggleMenuList?.find((menu) => activeKey?.startsWith(menu)) || path}
          >
            <Link href='/admin'>
              <div className={`${itemClass} ${path === '/admin' ? 'active' : ''}`}>
                <i className='las la-chart-bar fs-6 me-2' />
                Dashboard
              </div>
            </Link>

            {/* HOME */}
            <CustomToggle
              icon='pager'
              eventKey={'/admin/home'}
              isActive={activeKey === '/admin/home'}
              setActiveKey={setActiveKey}
            >
              Home
            </CustomToggle>
            <Accordion.Collapse eventKey={'/admin/home'}>
              <div className='p-1 bg-xxx radius-10'>
                <Link href='/admin/home/banner'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/home/banner') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Banner
                  </div>
                </Link>
                <Link href='/admin/home/assets'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/home/assets') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Assets
                  </div>
                </Link>
                <Link href='/admin/home/customer'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/home/customer') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Customer
                  </div>
                </Link>
              </div>
            </Accordion.Collapse>

            {/* ABOUT */}
            <CustomToggle
              icon='info-circle'
              eventKey={'/admin/about'}
              isActive={activeKey === '/admin/about'}
              setActiveKey={setActiveKey}
            >
              About
            </CustomToggle>
            <Accordion.Collapse eventKey={'/admin/about'}>
              <div className='p-1 bg-xxx radius-10'>
                <Link href='/admin/about/company'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/about/company') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Company Profile
                  </div>
                </Link>
                <Link href='/admin/about/history'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/about/history') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    History
                  </div>
                </Link>
                <Link href='/admin/about/vision'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/about/vision') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Vision, Mission & Values
                  </div>
                </Link>
                <Link href='/admin/about/organization'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/about/organization') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Organization Structure
                  </div>
                </Link>
                <Link href='/admin/about/certification'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/about/certification') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Certification
                  </div>
                </Link>
                <Link href='/admin/about/management'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/about/management') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Management
                  </div>
                </Link>
              </div>
            </Accordion.Collapse>

            {/* NEWS */}
            <CustomToggle
              icon='globe'
              eventKey={'/admin/news'}
              isActive={activeKey === '/admin/news'}
              setActiveKey={setActiveKey}
            >
              News
            </CustomToggle>
            <Accordion.Collapse eventKey={'/admin/news'}>
              <div className='p-1 bg-xxx radius-10'>
                <Link href='/admin/news/media'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/news/media') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Media
                  </div>
                </Link>
                <Link href='/admin/news/carreer'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/news/carreer') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Carreer
                  </div>
                </Link>
              </div>
            </Accordion.Collapse>

            {/* SERVICES */}
            <CustomToggle
              icon='shipping-fast'
              eventKey={'/admin/services'}
              isActive={activeKey === '/admin/services'}
              setActiveKey={setActiveKey}
            >
              Services
            </CustomToggle>
            <Accordion.Collapse eventKey={'/admin/services'}>
              <div className='p-1 bg-xxx radius-10'>
                <Link href='/admin/services/general'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/services/general') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    General
                  </div>
                </Link>
                <Link href='/admin/services/marine'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/services/marine') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Marine
                  </div>
                </Link>
              </div>
            </Accordion.Collapse>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
export default Index
