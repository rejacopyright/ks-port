import { useRef } from 'react'
import { setUser } from '@redux'

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
    <div className='container-fluid mb-5' style={{ marginTop: '10rem' }}>
      <div className='row'>
        <div className='col-12'>
          <h2>LOGIN</h2>
        </div>
        <div className='col-auto'>
          <label className='d-block'>Username</label>
          <input
            ref={(ref) => (inputRef.username = ref)}
            type='text'
            name='username'
            className=''
            defaultValue='Reja Jamil'
          />
        </div>
        <div className='col-auto'>
          <label className='d-block'>Password</label>
          <input
            ref={(ref) => (inputRef.password = ref)}
            type='password'
            name='password'
            className=''
            defaultValue={Date.now()}
          />
        </div>
        <div className='col-12 mt-2'>
          <div className='btn btn-primary' onClick={handleSubmit}>
            LOGIN
          </div>
        </div>
      </div>
    </div>
  )
}
export default Index
