import { useRouter } from 'next/router'
import Image from 'next/future/image'

const ErrorPage = () => {
  const router = useRouter()
  return (
    <div className='flex-center vh-100 w-100'>
      <div className='text-center'>
        <div className='mb-5'>
          <Image
            className='h-150px w-auto'
            priority
            alt='img'
            quality={50}
            src={require(`@images/404.png`)}
          />
        </div>
        <p className='text-dark my-3 fs-6 fw-300'>
          Sorry, the page you were looking for does not exist or is not available
        </p>
        <div className='btn btn-sm btn-primary text-white' onClick={() => router.back()}>
          <i className='las la-arrow-left me-2' />
          <span>Back To Home</span>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
