import { useState } from 'react'
import Image from 'next/image'
import Dropdown from 'react-bootstrap/Dropdown'
import Socmed from '@components/button/socmed'
// IMAGES
import idImage from '@images/flags/id.svg'
import enImage from '@images/flags/en.svg'
const Index = () => {
  const [showLang, setSholLang] = useState(false)
  const [lang, setLang] = useState('id')
  return (
    <div className='w-100 flex-end' style={{ background: 'rgba(0,0,0,0.25)' }}>
      <Socmed placement='bottom' className='me-3' />
      <div className='py-2 px-3 text-white'>
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
            <div className='position-relative h-15px w-20px me-1'>
              {lang === 'id' ? (
                <Image quality={10} alt='img' layout='fill' objectFit='cover' src={idImage} />
              ) : (
                <Image quality={10} alt='img' layout='fill' objectFit='cover' src={enImage} />
              )}
            </div>
            <span className='text-uppercase fs-7' style={{ marginTop: 3 }}>
              {lang}
            </span>
            <i className='las la-angle-down ms-1' />
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
              <div className='position-relative h-15px w-20px me-2'>
                <Image quality={10} alt='img' layout='fill' objectFit='cover' src={idImage} />
              </div>
              <span>ID</span>
            </div>
            <div
              className='dropdown-item flex-start pointer'
              onClick={() => {
                setLang('en')
                setSholLang(false)
              }}
            >
              <div className='position-relative h-15px w-20px me-2'>
                <Image quality={10} alt='img' layout='fill' objectFit='cover' src={enImage} />
              </div>
              <span>EN</span>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default Index
