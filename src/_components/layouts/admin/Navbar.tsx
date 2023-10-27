import { detailUser } from '@api/users'
// IMAGES
import defaultAvatar from '@images/avatar.png'
import ModalAddEdit from '@pages/admin/users/AddEdit'
import { logout, setUser } from '@redux'
import { FC, useLayoutEffect, useRef, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Index: FC<any> = ({ thisHeight = () => '' }) => {
  const user = useSelector(({ user }) => user)
  const { avatar, name, username, id } = user || {}

  const ref: any = useRef()
  const [showModalAddEdit, setShowModalAddEdit] = useState<any>(false)
  const [height, setHeight] = useState<any>(0)
  useLayoutEffect(() => {
    if (ref?.current) {
      const currentHeight = ref?.current?.offsetHeight
      setHeight(currentHeight)
      thisHeight(currentHeight)
    }
  }, [thisHeight])
  const onSubmit = () => {
    detailUser(id).then(({ data }) => {
      if (data?.id) {
        setUser({ ...user, ...data })
      }
    })
  }
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
                className='position-relative same-35px radius-50 overflow-hidden border border-1'
                style={{ background: `url(${avatar || defaultAvatar}) center / cover no-repeat` }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className='border-0 fs-8 shadow radius-5 px-2' style={{ minWidth: 100 }}>
              <div className='m-2'>
                <div
                  className='position-relative same-100px mx-auto radius-50 overflow-hidden border border-1'
                  style={{ background: `url(${avatar || defaultAvatar}) center / cover no-repeat` }}
                />
              </div>
              <div className='text-center'>
                <div className='text-primary fs-9'>{username}</div>
                <div className='fw-400 fs-8'>{name}</div>
              </div>
              <Dropdown.Divider />
              <Link to='/'>
                <div className='dropdown-item px-1 flex-start pointer'>
                  <i className='las la-home me-2' />
                  <span>Homepage</span>
                </div>
              </Link>
              <div
                className='dropdown-item px-1 flex-start pointer'
                onClick={() => setShowModalAddEdit(true)}
              >
                <i className='las la-pencil-alt me-2' />
                <span>Edit Profile</span>
              </div>
              <Dropdown.Divider />
              <div className='dropdown-item px-1 flex-start pointer' onClick={logout}>
                <i className='las la-lock me-2' />
                <span>Logout</span>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div style={{ marginBottom: height }} />
      {/* MODAL ADD EDIT */}
      <ModalAddEdit
        showModal={showModalAddEdit}
        setShowModal={setShowModalAddEdit}
        detail={user}
        setDetail={onSubmit}
      />
    </>
  )
}

export default Index
