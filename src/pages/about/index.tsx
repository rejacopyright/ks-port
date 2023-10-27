import '@styles/_froala.scss'

import { detailAbout } from '@api/about'
import { CardLoader } from '@components/loader'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Provider from './Provider'
const Index: FC<any> = () => {
  const { scope = 'company' } = useParams()
  const [detail, setDetail] = useState<any>({})
  const [loading, setLoading] = useState<any>(false)
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
        <div className='mt-3'>
          {/* <div className='fs-4 fw-500 mb-2'>{detail?.title || 'Company Profile'}</div> */}
          <div
            className='w-100 overflow-auto'
            dangerouslySetInnerHTML={{ __html: detail?.description }}
          />
        </div>
      )}
    </Provider>
  )
}
export default Index
