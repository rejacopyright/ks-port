import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { expand } from '@helpers/config'
import { Link } from 'react-router-dom'
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
    blur: sticky ? blurBg() : { backdropFilter: 'blur(0px)' },
    text: `fs-8 py-${expand}-4 ${sticky ? 'text-primary fw-600' : 'text-white'}`,
  }
  return (
    <>
      <div style={{ marginBottom: height * 0 }} />
      <div
        ref={ref}
        className={`position-fixed top-0 w-100 py-0 ${
          sticky
            ? 'animate__animated animate__fadeInDown animate__faster shadow-lg-bold'
            : 'bg-transparent'
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
            <Link to='/'>
              <div className={`d-flex d-${expand}-nonexxx pointer`}>
                {sticky ? (
                  <img className='h-40px w-auto' alt='img' src={require(`@images/logo.png`)} />
                ) : (
                  <img
                    className='h-40px w-auto'
                    alt='img'
                    src={require(`@images/logo-white.png`)}
                  />
                )}
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className='ms-auto'>
              <Link to='/' className={`nav-link ${styles.text}`}>
                HOME
              </Link>
              <Link to='/about' className={`nav-link ${styles.text}`}>
                ABOUT US
              </Link>
              <Link to='/services' className={`nav-link ${styles.text}`}>
                SERVICES
              </Link>
              <Link to='/news' className={`nav-link ${styles.text}`}>
                NEWS
              </Link>
              <Link to='/'>
                <div
                  className={`d-none d-${expand}-flexxx align-items-center justify-content-center mx-3 pointer`}
                >
                  {sticky ? (
                    <img
                      className='h-35px w-auto'
                      alt='img'
                      src={require(`@images/logo.png`).default}
                    />
                  ) : (
                    <img
                      className='h-35px w-auto'
                      alt='img'
                      src={require(`@images/logo-white.png`).default}
                    />
                  )}
                </div>
              </Link>
              <Link to='/contact' className={`nav-link ${styles.text}`}>
                CONTACT US
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
                  <Link to='/admin' className='dropdown-item'>
                    Login
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
