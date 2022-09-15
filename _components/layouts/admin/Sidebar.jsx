import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'

const itemClass = 'flex-start dropdown-item text-dark fw-400 p-2 pointer'
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
  const toggleMenuList = ['/admin/home']
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
                    className={`flex-start dropdown-item p-2 pointer ${
                      path?.startsWith('/admin/home/banner') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Banner
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
                    className={`flex-start dropdown-item p-2 pointer ${
                      path?.startsWith('/admin/news/media') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Media
                  </div>
                </Link>
                <Link href='/admin/news/carreer'>
                  <div
                    className={`flex-start dropdown-item p-2 pointer ${
                      path?.startsWith('/admin/news/carreer') ? 'active' : ''
                    }`}
                  >
                    <i className='las la-hashtag fs-6 me-1' />
                    Carreer
                  </div>
                </Link>
              </div>
            </Accordion.Collapse>
            <div className={itemClass}>
              <i className='las la-info-circle fs-6 me-2' />
              About Us
            </div>
            <Accordion.Collapse eventKey={1}>
              <div className=''>Lagi</div>
            </Accordion.Collapse>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
export default Index
