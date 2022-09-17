import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { getMedia } from '@api/news'
import defaultImage from '@images/placeholder-image.jpg'
import { htmlToString, strToSlug } from '@helpers'

const Index = () => {
  const { ref: titleRef, inView: titleShow } = useInView({
    threshold: 0.5,
    initialInView: true,
  })
  const { ref: iconRef, inView: iconShow } = useInView({
    threshold: 0.25,
    initialInView: true,
  })
  const [data, setData] = useState([])
  useEffect(() => {
    getMedia({ limit: 3 }).then(({ data: { data } = {} }) => {
      setData(data)
    })
  }, [])
  return (
    <div className='py-5 bg-white mt-n2'>
      <div className='container'>
        <div className='row my-5' ref={titleRef}>
          <div
            className={`col-12 text-center animate__animated ${
              titleShow ? 'animate__fadeInUp' : 'animate__fadeOutBottom'
            }`}
          >
            <div className='h4 m-0 text-primary mb-2 text-decoration-underline underline-offset-3'>
              NEWS & ACTIVITY
            </div>
          </div>
        </div>
        <div className='row justify-content-center' ref={iconRef}>
          {data?.map(({ id, title, description, file }, index) => (
            <div
              key={index}
              className={`col-auto mb-5 text-center animate__animated ${
                iconShow ? 'animate__fadeIn' : 'animate__fadeOut'
              }`}
            >
              <Link href={`/news/media/${strToSlug(title)}?id=${id}`}>
                <div className='radius-10 h-100 overflow-hidden bg-white shadow-sm hover-lg-bold pointer'>
                  <div className='position-relative same-200px bg-white overflow-hidden'>
                    <Image
                      priority
                      quality={30}
                      alt='img'
                      layout='fill'
                      objectFit='cover'
                      src={file || defaultImage}
                    />
                  </div>
                  <div className='p-3 w-200px'>
                    <div className='fs-7 fw-600 text-primary mb-2 text-truncate-2'>{title}</div>
                    <div className='fs-8 fw-500 text-bb text-truncate-2'>
                      {htmlToString(description)}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <div
            className={`col-auto mb-5 text-center animate__animated ${
              iconShow ? 'animate__fadeIn' : 'animate__fadeOut'
            }`}
          >
            <Link href='/news/media'>
              <div className='radius-10 opacity-50 h-100 flex-center overflow-hidden bg-f5 shadow-sms border border-dashed border-primary pointer text-hover-underline underline-offset-2'>
                <div className='p-3 w-200px'>
                  <div className='fs-7 fw-700 ls-1 text-primary text-truncate-2'>SEE MORE</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
