import { useEffect, useState } from 'react'
import { expand } from '@helpers/config'
import Link from 'next/link'
import Image from 'next/future/image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import Topbar from './Topbar'

const Index = () => {
  const [sticky, setSticky] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(undefined)
  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 150) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    })
  }, [])
  const blurBg = (opacity = 0.75, blur = 20) => ({
    background: `rgba(255,255,255,${opacity})`,
    backdropFilter: `blur(${blur}px)`,
  })
  const styles = {
    blur: sticky ? blurBg() : { background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(5px)' },
    text: `fs-9 py-${expand}-4 ${sticky ? 'text-primary fw-600' : 'text-white ls-1'}`,
  }
  return (
    <div
      className={`fixed-top w-100 py-0 ${
        sticky ? 'animate__animated animate__fadeInDown animate__faster shadow-lg-bold' : ''
      }`}
      style={{ zIndex: 9, ...styles.blur }}
    >
      {!sticky && <Topbar expand={expand} />}
      <Navbar
        // bg={sticky ? 'primary' : 'transparent'}
        className={`d-flex py-${expand}-0 px-3 px-${expand}-0`}
        expand={expand}
      >
        <Navbar.Brand>
          <Link href='/'>
            <div className={`d-flex d-${expand}-none`}>
              {sticky ? (
                <Image
                  priority
                  className='h-35px w-auto'
                  alt='img'
                  quality={50}
                  src={require(`@images/logo.png`).default}
                />
              ) : (
                <Image
                  priority
                  className='h-35px w-auto'
                  alt='img'
                  quality={50}
                  src={require(`@images/logo-white.png`).default}
                />
              )}
            </div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className='mx-auto'>
            <Link href='/'>
              <a className={`nav-link ${styles.text}`}>TENTANG KTI</a>
            </Link>
            <Link href='/business'>
              <a className={`nav-link ${styles.text}`}>BISNIS</a>
            </Link>
            <Link href='/customer'>
              <a className={`nav-link ${styles.text}`}>PELANGGAN</a>
            </Link>
            <Link href='/gcg'>
              <a className={`nav-link ${styles.text}`}>TATA KELOLA</a>
            </Link>
            <Link href='/news'>
              <a className={`nav-link ${styles.text}`}>BERITA</a>
            </Link>
            <Link href='/'>
              <div
                className={`d-none d-${expand}-flex align-items-center justify-content-center mx-3 pointer`}
              >
                {sticky ? (
                  <Image
                    className='h-35px w-auto'
                    alt='img'
                    quality={50}
                    src={require(`@images/logo.png`).default}
                  />
                ) : (
                  <Image
                    className='h-35px w-auto'
                    alt='img'
                    quality={50}
                    src={require(`@images/logo-white.png`).default}
                    priority
                  />
                )}
              </div>
            </Link>
            <Link href='/csr'>
              <a className={`nav-link ${styles.text}`}>CSR</a>
            </Link>
            <Link href='/vendor'>
              <a className={`nav-link ${styles.text}`}>VENDOR</a>
            </Link>
            <Link href='/employee'>
              <a className={`nav-link ${styles.text}`}>HUMAN CAPITAL</a>
            </Link>
            <Link href='/contact'>
              <a className={`nav-link ${styles.text}`}>KONTAK</a>
            </Link>
            <Dropdown
              navbar
              show={activeDropdown === 'Menu 1'}
              onMouseEnter={() => {
                setActiveDropdown('Menu 1')
              }}
              onMouseLeave={() => {
                setActiveDropdown(undefined)
              }}
            >
              <Dropdown.Toggle
                variant='transparent'
                id='menu_1'
                className={`flex-center nav-link shadow-none border-0 radius-0 ${styles.text}`}
              >
                <span>PEMESANAN</span>
                <i className='las la-angle-down ms-1' style={{ marginBottom: '2px' }} />
              </Dropdown.Toggle>
              <Dropdown.Menu className='border-0 fs-8 shadow-lg animate__animated animate__fadeInDown animate-100 radius-0'>
                <Link href='/admin'>
                  <a className='dropdown-item'>Login</a>
                </Link>
                <div className='dropdown-item pointer'>Another Action</div>
                {/* <Dropdown.Divider /> */}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Index
