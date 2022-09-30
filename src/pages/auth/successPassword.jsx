import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { inValidateToken } from '@api/auth'
import qs from 'qs'
import { getJWTPayload } from '@helpers'
import PageNotFound from '@pages/pageNotFound'

const Index = () => {
  const { search } = useLocation()
  const { token } = qs.parse(search, { ignoreQueryPrefix: true })
  const [tokenisValid, setTokenIsValid] = useState(true)

  useEffect(() => {
    const payload = getJWTPayload(token)
    if (payload?.sub) {
      inValidateToken(token)
    } else {
      setTokenIsValid(false)
    }
  }, [token])

  if (!token || !tokenisValid) {
    return <PageNotFound />
  }

  return (
    <div className='flex-center w-100 vh-80'>
      <div className='p-4 text-center'>
        <div className='mb-3'>
          <img width={300} src={require('@images/stock/7-dark.png')} alt='img' />
        </div>
        <div className='fw-400 fs-4 mb-1'>Password berhasil di ubah</div>
        <div className='fw-300 fs-6 mb-4'>Silahkan login untuk masuk ke halaman admin !!!</div>
        <div className=''>
          <Link to='/login' className='btn btn-primary text-white fs-7'>
            Go To Login Page
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Index
