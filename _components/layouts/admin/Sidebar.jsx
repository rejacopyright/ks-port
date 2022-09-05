import { useState } from 'react'
import Link from 'next/link'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'

const itemClass = 'flex-start dropdown-item text-primary fw-500 p-2 pointer'
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
  const [activeKey, setActiveKey] = useState(undefined)
  return (
    <div className='row'>
      <div className='col-12'>
        <div className='bg-white bg-fe p-2 radius-10' style={{ minWidth: 200 }}>
          <Accordion defaultActiveKey={activeKey}>
            <Link href='/admin'>
              <div className={itemClass}>
                <i className='las la-chart-bar fs-6 me-2' />
                Dashboard
              </div>
            </Link>
            <CustomToggle
              icon='pager'
              eventKey={0}
              isActive={activeKey === 0}
              setActiveKey={setActiveKey}
            >
              Home
            </CustomToggle>
            <Accordion.Collapse eventKey={0}>
              <div className='p-1 bg-fas radius-10'>
                <Link href='/admin/home/banner'>
                  <div className='flex-start dropdown-item p-2 pointer'>
                    <i className='las la-hashtag fs-6 me-1' />
                    Banner
                  </div>
                </Link>
                <div className='flex-start dropdown-item p-2 pointer'>
                  <i className='las la-hashtag fs-6 me-1' />
                  Customer
                </div>
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
