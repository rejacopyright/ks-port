import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StickyAdmin } from '@helpers/hooks'
import { InputIcon } from '@components/form'
import { getMedia } from '@api/news'
import defaultImage from '@images/placeholder-image.jpg'
import { htmlToString, strToSlug } from '@helpers'

const Index = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getMedia().then(({ data: { data } }) => {
      if (data?.length) {
        setData(data)
      }
    })
  }, [])

  return (
    <>
      <StickyAdmin>
        <div className='bg-white shadow-sm rounded mx-n2 text-center mb-3'>
          <div className='row flex-start p-3'>
            <div className='col col-sm-6'>
              <InputIcon left='search' />
            </div>
            <div className='col-auto ms-auto'>
              <Link href='/admin/news/media/add'>
                <div className='btn fs-8 btn-primary text-white'>
                  <i className='las la-plus me-1' />
                  Create News
                </div>
              </Link>
            </div>
          </div>
        </div>
      </StickyAdmin>
      <div className='row'>
        {data?.map(({ title, file, description, id }, index) => (
          <div key={index} className='col-sm-6 col-lg-4 mb-5 flex-column-reverse'>
            <div className='position-relative radius-10 overflow-hidden bg-white shadow-sm hover-lg-bold h-100'>
              <div className='position-relative h-150px flex-center bg-white overflow-hidden'>
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
                <div className='fs-8 fw-500 mb-2 text-truncate-2 text-capitalize'>{title}</div>
                <div className='fs-9 fw-300 text-bb text-truncate-3'>
                  {htmlToString(description)}
                </div>
              </div>
              <div className='absolute-center-h bottom-0 mb-3'>
                <div className='flex-center'>
                  <a
                    href={`/news/media/${strToSlug(title)}?id=${id}`}
                    target='_blank'
                    className='btn btn-sm btn-light-primary fs-8 text-nowrap me-2'
                    rel='noreferrer'
                  >
                    View
                    <i className='las la-external-link-alt fs-6 ms-1' />
                  </a>
                  <Link href={`/admin/news/media/edit/${id}`}>
                    <div className='btn btn-sm btn-light-warning fs-8 text-nowrap'>
                      <i className='las la-pencil-alt me-1' />
                      Edit
                    </div>
                  </Link>
                </div>
              </div>
              <div className='position-absolute top-0 end-0 p-2'>
                <div className='btn btn-sm flex-center same-20px bg-danger text-white radius-50'>
                  <i className='las la-times' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Index
