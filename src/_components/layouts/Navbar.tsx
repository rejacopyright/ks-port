import { getAbout } from '@api/about'
import { expand } from '@helpers'
import { FC, Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

import Topbar from './Topbar'

const Index: FC<any> = () => {
  const ref: any = useRef()
  const [sticky, setSticky] = useState<any>(false)
  const [activeDropdown, setActiveDropdown] = useState<any>(undefined)
  const [activeSubDropdown, setActiveSubDropdown] = useState<any>(undefined)
  const [height, setHeight] = useState<any>(0)
  const [aboutMenus, setAboutMenus] = useState<any>([])

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
    getAbout().then(({ data: { data } = {} }) => {
      setAboutMenus(
        data
          ?.filter(({ active }: any) => active)
          ?.map(({ scope: path, title, parent, children: child }: any) => ({
            path,
            title,
            parent,
            child,
          }))
      )
    })
  }, [])
  const blurBg = (opacity = 0.85, blur = 20) => ({
    background: `rgba(255,255,255,${opacity})`,
    backdropFilter: `blur(${blur}px)`,
  })
  const styles = {
    blur: sticky ? blurBg() : { backdropFilter: 'blur(0px)' },
    text: `fs-8 py-${expand}-3 ${sticky ? 'text-primary fw-600' : 'text-white'}`,
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
        <div className={sticky ? 'd-none' : 'd-block'}>
          <Topbar expand={expand} />
        </div>
        <Navbar
          // bg={sticky ? 'primary' : 'transparent'}
          id='navbarUser'
          className={`d-flex py-${expand}-0 px-3 px-${expand}-4`}
          expand={expand}
        >
          <Navbar.Brand>
            <Link to='/'>
              <div className={`d-flex d-${expand}-nonexxx pointer position-relative`}>
                {sticky ? (
                  <img className='h-40px w-auto' alt='img' src={require(`@images/logo.png`)} />
                ) : (
                  <div
                    className='position-absolute h-35px w-180px start-0 z-9'
                    style={{ top: '-70px' }}
                  >
                    <img
                      className='h-100 w-auto'
                      alt='img'
                      src={require(`@images/logo-white.png`)}
                    />
                  </div>
                )}
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className='ms-auto'>
              {/* HOME */}
              <Link to='/' className={`nav-link ${styles.text}`}>
                HOME
              </Link>

              {/* ABOUT US */}
              {aboutMenus?.length > 0 ? (
                <Dropdown
                  navbar
                  show={activeDropdown === 'about'}
                  onMouseEnter={() => {
                    setActiveDropdown('about')
                  }}
                  onMouseLeave={() => {
                    setActiveDropdown(undefined)
                  }}
                >
                  <Dropdown.Toggle
                    variant='transparent'
                    id='about'
                    className={`flex-center nav-link shadow-none border-0 radius-0 ${styles.text}`}
                  >
                    <span>ABOUT US</span>
                    <i className='las la-angle-down ms-1' style={{ marginBottom: '2px' }} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='border-0 fs-8 shadow-lg-bold animate__animated animate__fadeInDown animate-100 radius-0'>
                    {aboutMenus
                      ?.filter(({ parent, path }: any) => !parent && path !== 'organization')
                      ?.map(({ path, title, child }: any, index: any) => (
                        <Fragment key={index}>
                          {child?.length > 0 ? (
                            <Dropdown
                              autoClose={'outside'}
                              drop='start'
                              show={activeSubDropdown === path}
                              onMouseEnter={() => {
                                setActiveSubDropdown(path)
                              }}
                              onMouseLeave={() => {
                                setActiveSubDropdown(undefined)
                              }}
                            >
                              <Dropdown.Toggle
                                variant='primary'
                                id={path}
                                className={`flex-start dropdown-item text-start w-100 shadow-none py-2 px-3 fs-8 fw-500 border-0 radius-0 m-0`}
                              >
                                <div className='text-darks w-100'>{title}</div>
                                <i
                                  className='las la-angle-right ms-1'
                                  style={{ marginBottom: '2px' }}
                                />
                              </Dropdown.Toggle>
                              <Dropdown.Menu className='border-0 fs-8 shadow-lg-bold animate__animated animate__fadeInDown animate-100 radius-0 m-0'>
                                {child?.map(({ id, scope, title }: any) => (
                                  <Link
                                    key={id}
                                    to={`/about/${scope}`}
                                    className='dropdown-item radius-0 fw-500 py-2'
                                  >
                                    {title}
                                  </Link>
                                ))}
                              </Dropdown.Menu>
                            </Dropdown>
                          ) : (
                            <Link
                              to={`/about/${path}`}
                              className='dropdown-item radius-0 fw-500 py-2'
                            >
                              {title}
                            </Link>
                          )}
                        </Fragment>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link to='/about' className={`nav-link ${styles.text}`}>
                  ABOUT US
                </Link>
              )}

              {/* SERVICES */}
              <Dropdown
                navbar
                show={activeDropdown === 'services'}
                onMouseEnter={() => {
                  setActiveDropdown('services')
                }}
                onMouseLeave={() => {
                  setActiveDropdown(undefined)
                }}
              >
                <Dropdown.Toggle
                  variant='transparent'
                  id='services'
                  className={`flex-center nav-link shadow-none border-0 radius-0 ${styles.text}`}
                >
                  <span>SERVICES</span>
                  <i className='las la-angle-down ms-1' style={{ marginBottom: '2px' }} />
                </Dropdown.Toggle>
                <Dropdown.Menu className='border-0 fs-8 shadow-lg-bold animate__animated animate__fadeInDown animate-100 radius-0'>
                  <Link to='/services' className='dropdown-item radius-0 fw-500 py-2'>
                    General
                  </Link>
                  <Link to='/services/marine' className='dropdown-item radius-0 fw-500 py-2'>
                    Marine
                  </Link>
                  <Link to='/services/how-to-order' className='dropdown-item radius-0 fw-500 py-2'>
                    How To Order
                  </Link>
                </Dropdown.Menu>
              </Dropdown>

              {/* NEWS */}
              <Dropdown
                navbar
                show={activeDropdown === 'news'}
                onMouseEnter={() => {
                  setActiveDropdown('news')
                }}
                onMouseLeave={() => {
                  setActiveDropdown(undefined)
                }}
              >
                <Dropdown.Toggle
                  variant='transparent'
                  id='news'
                  className={`flex-center nav-link shadow-none border-0 radius-0 ${styles.text}`}
                >
                  <span>NEWS</span>
                  <i className='las la-angle-down ms-1' style={{ marginBottom: '2px' }} />
                </Dropdown.Toggle>
                <Dropdown.Menu className='border-0 fs-8 shadow-lg-bold animate__animated animate__fadeInDown animate-100 radius-0'>
                  <Link to='/news' className='dropdown-item radius-0 fw-500 py-2'>
                    Media
                  </Link>
                  <Link to='/news/carreer' className='dropdown-item radius-0 fw-500 py-2'>
                    Carreer
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
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
