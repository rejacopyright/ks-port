import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCarreer } from '@api/news'
import { htmlToString, strToSlug } from '@helpers'
import { CardLoader } from '@components/loader'

const Index = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getCarreer()
      .then(({ data: { data } = {} }) => {
        setData(data || [])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return (
    <>
      {loading ? (
        <div className='mt-2'>
          <CardLoader count={6} className='col-sm-6 col-lg-4 mb-4' />
        </div>
      ) : (
        <div className='row'>
          {data.map(({ id, title, description }, index) => (
            <div key={index} className='col-sm-6 col-lg-4 mb-3 flex-column-reverse'>
              <div className='position-relative radius-10 overflow-hidden bg-white shadow-sm hover-lg-bold h-100'>
                <div className='p-3 w-200px mb-5'>
                  <div className='fs-7 fw-500 mb-2 text-truncate-2'>{title}</div>
                  <div className='fs-9 fw-300 text-bb text-truncate-3'>
                    {htmlToString(description)}
                  </div>
                </div>
                <div className='position-absolute bottom-0 m-3'>
                  <Link to={`/news/carreer/${strToSlug(title)}?id=${id}`}>
                    <div className='btn btn-sm btn-light-primary fs-8'>See or Apply</div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
export default Index
