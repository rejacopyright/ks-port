import { useRef } from 'react'
import { setUser } from '@redux'
import Link from 'next/link'

const Index = () => {
  const inputRef = useRef()
  const handleSubmit = () => {
    const {
      username: { value: username },
      password: { value: password },
    } = inputRef || {}
    if (username && password) {
      setUser({ id: 1, username, password, token: 'token123' })
    }
  }
  return (
    <div className='container-fluid vh-90 flex-center w-100'>
      <div className='row'>
        <div className='col-12 col-md-6 offset-md-3'>
          <div className='bg-fas p-3 rounded'>
            <div className='row'>
              <div className='col-12 text-center mb-3'>
                <div className='border-bottom border-f2 pb-2'>
                  <div className='fs-3 fw-600 text-primary'>LOGIN</div>
                  <div className='fs-8 fw-600s'>Lorem ipsum dolor sit amet.</div>
                </div>
              </div>
              <div className='col-12 mb-3'>
                <label className='d-block mb-1'>Username</label>
                <input
                  ref={(ref) => (inputRef.username = ref)}
                  type='text'
                  name='username'
                  className='form-control form-control-sm form-control-solid py-2'
                  defaultValue='Reja Jamil'
                />
              </div>
              <div className='col-12 mb-3'>
                <label className='d-block mb-1'>Password</label>
                <input
                  ref={(ref) => (inputRef.password = ref)}
                  type='password'
                  name='password'
                  className='form-control form-control-sm form-control-solid py-2'
                  defaultValue={Date.now()}
                />
              </div>
              <div className='col-12 mt-1 text-end'>
                <div className='border-top border-f2 pt-3'>
                  <Link href='/'>
                    <div className='btn btn-sm border-0 px-3'>
                      <i className='las la-arrow-left me-2 text-cc' />
                      <span className='text-cc'>Back To Homepage</span>
                    </div>
                  </Link>
                  <div className='btn btn-sm btn-primary text-white px-3' onClick={handleSubmit}>
                    <i className='las la-check me-2 ms-n1' />
                    <span>LOGIN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Index
