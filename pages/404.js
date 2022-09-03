import React from 'react'
import Link from 'next/link'

const ErrorPage = () => {
  return (
    <div className='flex-center vh-70 w-100'>
      <p>
        The page you are looking for might have been removed had its name changed or is temporarily
        unavailable.
      </p>

      <Link href='/'>
        <a className='btn btn-sm btn-primary'>Back To Home</a>
      </Link>
    </div>
  )
}

export default ErrorPage
