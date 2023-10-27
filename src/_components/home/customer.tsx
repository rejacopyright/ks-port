import { getHomeCustomer } from '@api/home'
import defaultImage from '@images/placeholder-image.jpg'
import { FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const Index: FC<any> = () => {
  const [data, setData] = useState<any>([])
  const { ref: titleRef, inView: titleShow } = useInView({
    threshold: 0.5,
    initialInView: true,
  })
  const { ref: iconRef, inView: iconShow } = useInView({
    threshold: 0.25,
    initialInView: true,
  })
  useEffect(() => {
    getHomeCustomer({ limit: 20 }).then(({ data: { data } = {} }) => {
      if (data?.length) {
        setData(data)
      }
    })
  }, [])
  return (
    <div className='py-5 bg-fa mt-n2'>
      <div className='container'>
        <div className='row my-5' ref={titleRef}>
          <div
            className={`col-12 text-center animate__animated ${
              titleShow ? 'animate__fadeInUp' : 'animate__fadeOutBottom'
            }`}
          >
            <div className='h4 m-0 text-primary mb-2'>OUR CUSTOMER</div>
            <div className='fs-7 m-0 text-dark mb-3'>
              We empower our customers to transform their industries.
              <br />
              We are trusted by the customers from various business industries.
            </div>
          </div>
        </div>
        {/* <hr className='mb-5 border-primary' /> */}
        <div className='row' ref={iconRef}>
          {data?.map(({ title, file }: any, index: any) => (
            <div
              key={index}
              className={`col-6 col-sm-3 col-lg-2 mb-5 text-center animate__animated animate__slower ${
                iconShow ? 'animate__fadeIn' : 'animate__fadeOut'
              }`}
            >
              <div
                className='position-relative mx-auto same-75px bg-white radius-20 mb-2 shadow-md'
                style={{ background: `url(${file || defaultImage}) center / cover no-repeat` }}
              />
              <div className='fs-8 fw-400 text-dark text-capitalize'>{title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Index
