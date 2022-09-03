import { logout } from '@redux'
const Index = () => {
  return (
    <div className='container-fluid mb-5' style={{ marginTop: '10rem' }}>
      <div className='row'>
        <div className='col-12'>
          <h5>This page is protected</h5>
          <div className='btn btn-danger' onClick={logout}>
            LOGOUT
          </div>
        </div>
      </div>
    </div>
  )
}
export default Index
