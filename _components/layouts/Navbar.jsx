import { useEffect, useState, useRef, useLayoutEffect } from 'react'
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
  const ref = useRef()
  const [height, setHeight] = useState(0)
  useLayoutEffect(() => {
    if (ref?.current) {
      const currentHeight = ref?.current?.offsetHeight
      setHeight(currentHeight)
    }
  }, [setHeight])
  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    })
  }, [])
  const blurBg = (opacity = 0.85, blur = 20) => ({
    background: `rgba(255,255,255,${opacity})`,
    backdropFilter: `blur(${blur}px)`,
  })
  const styles = {
    blur: sticky ? blurBg() : { backdropFilter: 'blur(5px)' },
    text: `fs-8 py-${expand}-4 ${sticky ? 'text-primary fw-600' : 'text-white'}`,
  }
  return (
    <>
      <div style={{ marginBottom: height }} />
      <div
        ref={ref}
        className={`position-fixed top-0 w-100 py-0 ${
          sticky
            ? 'animate__animated animate__fadeInDown animate__faster shadow-lg-bold'
            : 'bg-primary'
        }`}
        style={{ zIndex: 9, ...styles.blur }}
      >
        {!sticky && <Topbar expand={expand} />}
        <Navbar
          // bg={sticky ? 'primary' : 'transparent'}
          id='navbarUser'
          className={`d-flex py-${expand}-0 px-3 px-${expand}-4`}
          expand={expand}
        >
          <Navbar.Brand>
            <Link href='/'>
              <div className={`d-flex d-${expand}-nonexxx pointer`}>
                {sticky ? (
                  <Image
                    priority
                    className='h-25px w-auto'
                    alt='img'
                    quality={50}
                    src={require(`@images/logo.png`).default}
                  />
                ) : (
                  <Image
                    priority
                    className='h-25px w-auto'
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
            <Nav className='ms-auto'>
              <Link href='/'>
                <a className={`nav-link ${styles.text}`}>HOME</a>
              </Link>
              <Link href='/about'>
                <a className={`nav-link ${styles.text}`}>ABOUT US</a>
              </Link>
              <Link href='/services'>
                <a className={`nav-link ${styles.text}`}>SERVICES</a>
              </Link>
              <Link href='/news'>
                <a className={`nav-link ${styles.text}`}>NEWS</a>
              </Link>
              <Link href='/'>
                <div
                  className={`d-none d-${expand}-flexxx align-items-center justify-content-center mx-3 pointer`}
                >
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
              <Link href='/contact'>
                <a className={`nav-link ${styles.text}`}>CONTACT US</a>
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
                className='d-none xxx'
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
    </>
  )
}

export default Index
