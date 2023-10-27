import { getMedia } from '@api/news'
import { CardLoader } from '@components/loader'
import Pagination from '@components/tools/pagination'
import { htmlToString, strToSlug } from '@helpers'
import defaultImage from '@images/placeholder-image.jpg'
import qs from 'qs'
import { FC, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Index: FC<any> = () => {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const query = qs.parse(search, { ignoreQueryPrefix: true })
  const { page = 1 } = query
  const [data, setData] = useState<any>([])
  const [meta, setMeta] = useState<any>({ total: 0, limit: 0 })
  const [loading, setLoading] = useState<any>(false)
  useEffect(() => {
    setLoading(true)
    getMedia({ page, limit: 6 })
      .then(({ data: { data, total, per_page: limit } = {} }) => {
        setData(data || [])
        setMeta({ total, limit })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page])
  return (
    <>
      {loading ? (
        <div className='mt-2'>
          <CardLoader count={6} className='col-sm-6 col-lg-4 mb-4' />
        </div>
      ) : (
        <div className='row mt-2'>
          {data.map(({ id, title, description, file }: any, index: any) => (
            <div key={index} className='col-sm-6 col-lg-4 mb-5 flex-column-reverse'>
              <div className='position-relative radius-10 overflow-hidden bg-white shadow-sm hover-lg-bold h-100'>
                <div
                  className='position-relative h-150px bg-white overflow-hidden'
                  style={{
                    background: `url(${file || defaultImage}) center / cover no-repeat`,
                  }}
                />
                <div className='p-3 w-100 mb-5'>
                  <div className='fs-8 fw-500 mb-2 text-truncate-2'>{title}</div>
                  <div className='fs-9 fw-300 text-bb text-truncate-3'>
                    {htmlToString(description)}
                  </div>
                </div>
                <div className='absolute-center-h bottom-0 mb-3'>
                  <Link to={`/news/media/${strToSlug(title)}?id=${id}`}>
                    <div className='btn btn-sm btn-light-primary fs-8'>Read more</div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='row'>
        <div className='col-12'>
          <Pagination
            className='mt-3 mb-5'
            limit={meta?.limit}
            showLimit={false}
            total={meta?.total}
            page={page}
            onChangePage={(e: any) => {
              navigate({ pathname, search: `?page=${e}` })
              setMeta((prev: any) => ({ ...prev, page: e }))
            }}
          />
        </div>
      </div>
    </>
  )
}
export default Index
