import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Banner from '@components/banner'
import { detailCarreer } from '@api/news'
import moment from 'moment'
import { CardLoader, TextLoader } from '@components/loader'
import qs from 'qs'

const Breadcrumb = () => {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'>
          <Link to='/news'>News</Link>
        </li>
        <li className='breadcrumb-item'>
          <Link to='/news/carreer'>Carreer</Link>
        </li>
        <li className='breadcrumb-item active' aria-current='page'>
          Detail
        </li>
      </ol>
    </nav>
  )
}

const Index = () => {
  const { search } = useLocation()
  const params = qs.parse(search, { ignoreQueryPrefix: true })
  const [detail, setDetail] = useState(undefined)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (params?.id) {
      setLoading(true)
      detailCarreer(params?.id)
        .then(({ data }) => {
          setDetail(data)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [params?.id])
  return (
    <>
      <Banner height='125' content={false} />
      <div className='container py-4 mb-5'>
        <div className='row'>
          <div className='col-12 mb-3'>
            <Breadcrumb />
          </div>
        </div>
        {loading ? (
          <div className='mt-2'>
            <CardLoader count={1} className='col-12 mb-5' height={200} />
            <TextLoader count={3} className='col-12 mb-3' />
          </div>
        ) : (
          <>
            {detail ? (
              <div className='row'>
                <div className='col-12 mb-5'>
                  <div className='flex-end'>
                    <i className='las la-user me-1 fs-6 text-primary' />
                    <div className='text-primary'>Uploaded at</div>
                    <div className='text-aa mx-2'>-</div>
                    <div className='text-aa'>
                      {moment(detail?.created_at || undefined)?.format('DD MMMM Y, H:mm A')}
                    </div>
                    <i className='las la-clock ms-1 fs-7 text-aa' />
                  </div>
                </div>
                <div className='col-12'>
                  <div className='fs-4 fw-500 mb-3 text-capitalize'>{detail?.title}</div>
                  <div
                    className='w-100 overflow-auto'
                    dangerouslySetInnerHTML={{ __html: detail?.description }}
                  />
                </div>
              </div>
            ) : (
              <div className='flex-center vh-50 mb-5'>
                <div className='text-center'>
                  <div
                    className='position-relative mx-auto mb-3 same-200px'
                    style={{
                      background: `url(${require('@images/stock/15-dark.png')}) center / cover no-repeat`,
                    }}
                  />
                  <div className='fw-300 fs-6'>
                    We&apos;re sorry, but We couldn&apos;t find <br /> the data you&apos;re looking
                    for
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
export default Index
