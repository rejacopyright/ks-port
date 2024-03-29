import { FC, useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import { Link, useLocation } from 'react-router-dom'

const itemClass = 'flex-start dropdown-item text-dark fw-500 p-2 pointer'
const CustomToggle: FC<any> = ({
  children,
  eventKey,
  isActive,
  setActiveKey = () => '',
  icon = 'home',
}) => {
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
const Index: FC<any> = () => {
  const { pathname: path } = useLocation()
  const [activeKey, setActiveKey] = useState<any>(path)
  useEffect(() => {
    setActiveKey(path)
  }, [path])
  const toggleMenuList = [
    '/admin/home',
    '/admin/about',
    '/admin/about/commissioners',
    '/admin/about/directors',
    '/admin/news',
    '/admin/services',
    '/admin/settings',
    '/admin/users',
  ]
  return (
    <div className='row'>
      <div className='col-12'>
        <div className='bg-white p-2 radius-10' style={{ minWidth: 200 }}>
          <Accordion
            defaultActiveKey={toggleMenuList?.find((menu) => activeKey?.startsWith(menu)) || path}
          >
            <Link to='/admin'>
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
                <Link to='/admin/home/popup'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/home/popup') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Popup
                  </div>
                </Link>
                <Link to='/admin/home/banner'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/home/banner') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Banner
                  </div>
                </Link>
                <Link to='/admin/home/assets'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/home/assets') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Assets
                  </div>
                </Link>
                <Link to='/admin/home/customer'>
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

            {/* BANNER */}
            <Link to='/admin/banner'>
              <div className={`${itemClass} ${path === '/admin/banner' ? 'active' : ''}`}>
                <i className='las la-image fs-6 me-2' />
                Banner
              </div>
            </Link>

            {/* ABOUT */}
            <CustomToggle
              icon='info-circle'
              eventKey={'/admin/about'}
              isActive={activeKey?.startsWith('/admin/about')}
              setActiveKey={setActiveKey}
            >
              About
            </CustomToggle>
            <Accordion.Collapse eventKey={'/admin/about'}>
              <div className='p-1 bg-xxx radius-10'>
                <Link to='/admin/about/company'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/about/company') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Company Profile
                  </div>
                </Link>
                {/* <Link to='/admin/about/history'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/about/history') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    History
                  </div>
                </Link> */}
                <Link to='/admin/about/vision'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/about/vision') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Vision, Mission & Values
                  </div>
                </Link>
                {/* <Link to='/admin/about/organization'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/about/organization') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Organization Structure
                  </div>
                </Link> */}
                {/* <Link to='/admin/about/certification'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/about/certification') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Certification
                  </div>
                </Link> */}

                {/* MANAGEMENT */}
                <Accordion
                  defaultActiveKey={
                    toggleMenuList?.includes(activeKey) ? '/admin/about/management' : path
                  }
                >
                  <CustomToggle
                    icon='dot-circle'
                    eventKey={'/admin/about/management'}
                    isActive={activeKey?.startsWith('/admin/about/management')}
                    setActiveKey={setActiveKey}
                  >
                    Management
                  </CustomToggle>
                  <Accordion.Collapse eventKey={'/admin/about/management'}>
                    <div className='p-1 bg-xxx radius-10'>
                      <Link to='/admin/about/commissioners'>
                        <div
                          className={`flex-start dropdown-item p-2 my-1 pointer ${
                            path?.startsWith('/admin/about/commissioners') ? 'active' : ''
                          }`}
                        >
                          <i className='las la-minus fs-6 me-1' />
                          Commissioners
                        </div>
                      </Link>
                      <Link to='/admin/about/directors'>
                        <div
                          className={`flex-start dropdown-item p-2 my-1 pointer ${
                            path?.startsWith('/admin/about/directors') ? 'active' : ''
                          }`}
                        >
                          <i className='las la-minus fs-6 me-1' />
                          Directors
                        </div>
                      </Link>
                    </div>
                  </Accordion.Collapse>
                </Accordion>
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
                <Link to='/admin/news/media'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/news/media') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Media
                  </div>
                </Link>
                <Link to='/admin/news/carreer'>
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
                <Link to='/admin/services/general'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/services/general') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    General
                  </div>
                </Link>
                <Link to='/admin/services/marine'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/services/marine') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Marine
                  </div>
                </Link>
                <Link to='/admin/services/how-to-order'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/services/how-to-order') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    How To Order
                  </div>
                </Link>
              </div>
            </Accordion.Collapse>

            {/* SETTINGS */}
            <CustomToggle
              icon='cog'
              eventKey={'/admin/settings'}
              isActive={activeKey === '/admin/settings'}
              setActiveKey={setActiveKey}
            >
              Settings
            </CustomToggle>
            <Accordion.Collapse eventKey={'/admin/settings'}>
              <div className='p-1 bg-xxx radius-10'>
                <Link to='/admin/settings/social'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/settings/social') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Social Media
                  </div>
                </Link>
                <Link to='/admin/settings/contact'>
                  <div
                    className={`flex-start dropdown-item p-2 my-1 pointer ${
                      path?.startsWith('/admin/settings/contact') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Contact
                  </div>
                </Link>
              </div>
            </Accordion.Collapse>
            {/* USERS */}
            <Link to='/admin/users'>
              <div className={`${itemClass} ${path === '/admin/users' ? 'active' : ''}`}>
                <i className='las la-user fs-6 me-2' />
                Users
              </div>
            </Link>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
export default Index
