import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Socmed from '@components/button/socmed'
// IMAGES
import idImage from '@images/flags/id.svg'
import enImage from '@images/flags/en.svg'
const Index = () => {
  const [showLang, setSholLang] = useState(false)
  const [lang, setLang] = useState('id')
  return (
    <div className='w-100 flex-end' id='topbarUser' style={{ background: 'rgba(0,0,0,0.15)' }}>
      <Socmed placement='bottom' className='me-3' />
      <div className='py-1 px-3 fw-500'>
        <Dropdown
          show={showLang}
          onMouseEnter={() => setSholLang(true)}
          onMouseLeave={() => setSholLang(false)}
        >
          <Dropdown.Toggle
            variant='transparent'
            id='lang'
            className='flex-center nav-link shadow-none border-0 radius-0'
          >
            <div
              className='position-relative h-15px w-20px me-1'
              style={{
                background: `url(${lang === 'id' ? idImage : enImage}) center / cover no-repeat`,
              }}
            />
            <div className='text-uppercase text-white fs-7 mt-1'>{lang}</div>
            <i className='las la-angle-down text-white ms-1' />
          </Dropdown.Toggle>
          <Dropdown.Menu
            className='border-0 fs-8 shadow-lg animate__animated animate__fadeInDown animate-100 radius-5'
            style={{ minWidth: 100 }}
          >
            <div
              className='dropdown-item flex-start pointer'
              onClick={() => {
                setLang('id')
                setSholLang(false)
              }}
            >
              <div
                className='position-relative h-15px w-20px me-2'
                style={{ background: `url(${idImage}) center / cover no-repeat` }}
              />
              <span>ID</span>
            </div>
            <div
              className='dropdown-item flex-start pointer'
              onClick={() => {
                setLang('en')
                setSholLang(false)
              }}
            >
              <div
                className='position-relative h-15px w-20px me-2'
                style={{ background: `url(${enImage}) center / cover no-repeat` }}
              />
              <span>EN</span>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default Index
