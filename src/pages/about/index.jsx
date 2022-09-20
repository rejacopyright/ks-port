import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { detailAbout } from '@api/about'
import { CardLoader } from '@components/loader'
import Provider from './Provider'
const Index = () => {
  const { scope = 'company' } = useParams()
  const [detail, setDetail] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    if (scope) {
      detailAbout(scope)
        .then(({ data }) => {
          setDetail(data)
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [scope])
  return (
    <Provider>
      {loading ? (
        <CardLoader count={2} className='col-12 mb-4' />
      ) : (
        <>
          <div className='fs-4 fw-500 mb-2'>{detail?.title || 'Company Profile'}</div>
          <div className='w-100' dangerouslySetInnerHTML={{ __html: detail?.description }} />
        </>
      )}
    </Provider>
  )
}
export default Index
