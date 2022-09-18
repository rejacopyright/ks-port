import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Provider from '@components/news/Provider'
import Meta from '@components/seo/meta'
import { getMedia } from '@api/news'
import defaultImage from '@images/placeholder-image.jpg'
import { htmlToString, strToSlug } from '@helpers'
import { CardLoader } from '@components/loader'

const Index = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getMedia()
      .then(({ data: { data } = {} }) => {
        setData(data || [])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return (
    <>
      <Meta title='Media' description={undefined} />
      {loading ? (
        <div className='mt-2'>
          <CardLoader count={6} className='col-sm-6 col-lg-4 mb-4' />
        </div>
      ) : (
        <div className='row mt-2'>
          {data.map(({ id, title, description, file }, index) => (
            <div key={index} className='col-sm-6 col-lg-4 mb-5 flex-column-reverse'>
              <div className='position-relative radius-10 overflow-hidden bg-white shadow-sm hover-lg-bold h-100'>
                <div className='position-relative h-150px bg-white overflow-hidden'>
                  <Image
                    priority
                    quality={30}
                    alt='img'
                    layout='fill'
                    objectFit='cover'
                    src={file || defaultImage}
                  />
                </div>
                <div className='p-3 w-100 mb-5'>
                  <div className='fs-8 fw-500 mb-2 text-truncate-2'>{title}</div>
                  <div className='fs-9 fw-300 text-bb text-truncate-3'>
                    {htmlToString(description)}
                  </div>
                </div>
                <div className='absolute-center-h bottom-0 mb-3'>
                  <Link href={`/news/media/${strToSlug(title)}?id=${id}`}>
                    <div className='btn btn-sm btn-light-primary fs-8'>Read more</div>
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
Index.Layout = Provider
export default Index
