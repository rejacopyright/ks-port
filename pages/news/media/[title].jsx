import { useEffect, useState } from 'react'
import Meta from '@components/seo/meta'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Banner from '@components/banner'
import { detailMedia } from '@api/news'
import moment from 'moment'

const Breadcrumb = () => {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'>
          <Link href='/news'>
            <a>News</a>
          </Link>
        </li>
        <li className='breadcrumb-item'>
          <Link href='/news/media'>
            <a>Media</a>
          </Link>
        </li>
        <li className='breadcrumb-item active' aria-current='page'>
          Detail
        </li>
      </ol>
    </nav>
  )
}

const Index = () => {
  const { query } = useRouter()
  const { id } = query || {}
  const [detail, setDetail] = useState(undefined)
  useEffect(() => {
    if (id) {
      detailMedia(id).then(({ data }) => {
        setDetail(data)
      })
    }
  }, [id])
  return (
    <>
      <Meta title='Kontak Kami' description={undefined} />
      <Banner height='125' content={false} />
      <div className='container py-4'>
        <div className='row'>
          <div className='col-12 mb-3'>
            <Breadcrumb />
          </div>
        </div>
        {detail ? (
          <div className='row'>
            <div className='col-12 mb-5'>
              {!!detail?.file && (
                <div className='position-relative h-300px bg-white overflow-hidden radius-10 shadow-lg-bold mb-3'>
                  <Image
                    priority
                    quality={30}
                    alt='img'
                    layout='fill'
                    objectFit='cover'
                    src={detail?.file}
                  />
                </div>
              )}
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
              <div className='w-100' dangerouslySetInnerHTML={{ __html: detail?.description }} />
            </div>
          </div>
        ) : (
          <div className='flex-center vh-50 mb-5'>
            <div className='text-center'>
              <div className='position-relative mx-auto mb-3 same-200px'>
                <Image
                  priority
                  style={{ opacity: 0.5 }}
                  alt='img'
                  layout='fill'
                  objectFit='contain'
                  quality={50}
                  src={require(`@images/stock/15-dark.png`)}
                />
              </div>
              <div className='fw-300 fs-6'>
                We&apos;re sorry, but We couldn&apos;t find <br /> the data you&apos;re looking for
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default Index
