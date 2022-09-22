import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '@redux'
import Dropdown from 'react-bootstrap/Dropdown'
// IMAGES
import avatar from '@images/user.png'
const Index = ({ thisHeight = () => '' }) => {
  const ref = useRef()
  const [height, setHeight] = useState(0)
  useLayoutEffect(() => {
    if (ref?.current) {
      const currentHeight = ref?.current?.offsetHeight
      setHeight(currentHeight)
      thisHeight(currentHeight)
    }
  }, [thisHeight])
  return (
    <>
      <div
        ref={ref}
        id='navbarAdmin'
        className='w-100 fixed-top flex-start bg-white border-bottom border-2 border-f5 px-3 px-md-4'
      >
        <Link to='/admin'>
          <div
            className='position-relative h-50px w-135px pointer'
            style={{
              background: `url(${require('@images/logo.png')}) center / contain no-repeat`,
            }}
          />
        </Link>
        <div className='text-white ms-auto'>
          <Dropdown>
            <Dropdown.Toggle
              variant='transparent'
              className='flex-center nav-link shadow-none border-0 radius-0 py-2'
            >
              <div
                className='position-relative same-35px radius-50 overflow-hidden'
                style={{ background: `url(${avatar}) center / cover no-repeat` }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className='border-0 fs-8 shadow radius-5 px-2' style={{ minWidth: 100 }}>
              <Link to='/'>
                <div className='dropdown-item flex-start pointer'>
                  <span>Homepage</span>
                </div>
              </Link>
              <div className='dropdown-item flex-start pointer'>
                <span>View Profile</span>
              </div>
              <div className='dropdown-item flex-start pointer'>
                <span>Edit Profile</span>
              </div>
              <Dropdown.Divider />
              <div className='dropdown-item flex-start pointer' onClick={logout}>
                <span>Logout</span>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div style={{ marginBottom: height }} />
    </>
  )
}

export default Index
