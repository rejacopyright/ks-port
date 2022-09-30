import { Link } from 'react-router-dom'
const Index = () => {
  return (
    <div className='flex-center w-100 vh-80'>
      <div className='p-4 text-center'>
        <div className='mb-5'>
          <img width={300} src={require('@images/stock/17.png')} alt='img' />
        </div>
        <div className='fw-300 fs-6'>Link reset password telah dikirim melalui email.</div>
        <div className='fw-400 fs-6 mb-1'>Masa berlaku link 2 jam.</div>
        <div className='fw-300 fs-7 mb-1'>
          Jika tidak menerima email, silahkan ulangi perminataan "
          <Link
            to='/forgot-password'
            className='fw-500 text-hover-underline underline-offset-2 fs-6'
          >
            Disini
          </Link>
          ".
        </div>
        <div className='fw-500 fs-3 text-primarys mb-3'>Segera cek email !!!</div>
        <div className=''>
          <Link to='/' className='btn btn-primary text-white fs-7'>
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Index
