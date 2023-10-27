import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage: FC<any> = () => {
  const navigate = useNavigate()
  return (
    <div className='flex-center vh-100 w-100'>
      <div className='text-center'>
        <div className='mb-5'>
          <img className='h-150px w-auto' alt='img' src={require(`@images/404.png`)} />
        </div>
        <p className='text-dark my-3 fs-6 fw-300'>
          Sorry, the page you were looking for does not exist or is not available
        </p>
        <div className='btn btn-sm btn-primary text-white' onClick={() => navigate(-1)}>
          <i className='las la-arrow-left me-2' />
          <span>Back To Home</span>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
