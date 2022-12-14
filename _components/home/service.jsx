import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'
import { useInView } from 'react-intersection-observer'
import { getServices } from '@api/services'
import defaultImage from '@images/placeholder-image.jpg'

const Index = () => {
  const [data, setData] = useState([])
  const { ref: myRef, inView: myElementIsVisible } = useInView({
    threshold: 0.25,
    initialInView: true,
  })
  const settings = {
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 2000,
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: true,
    speed: 300,
    slidesToShow: data?.length >= 4 ? 4 : data?.length,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: data?.length >= 3 ? 3 : data?.length,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: data?.length >= 2 ? 2 : data?.length,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }
  useEffect(() => {
    getServices({ type: 'general' }).then(({ data: { data } = {} }) => {
      setData(data)
    })
  }, [])
  return (
    <div className='py-5 bg-white my-5' ref={myRef}>
      <div className='container'>
        <div className='row'>
          <div
            className={`col-lg-6 offset-lg-3 text-center animate__animated animate__faster ${
              myElementIsVisible ? 'animate__fadeInLeft' : 'animate__fadeOutLeft'
            }`}
          >
            <div className='h4 m-0 fw-bold text-primary text-uppercase lh-30px mb-2'>
              Layanan Kami
            </div>
            <div className='fs-7 m-0 text-dark mb-3'>
              Memberikan pelayanan terintegrasi di seluruh kegiatan usaha di hulu (Pandu Tunda)
              hingga hilir (Jasa Logistik)
            </div>
          </div>
        </div>
        <div className='row'>
          <div
            className={`col-12 mt-4 position-relative animate__animated ${
              myElementIsVisible ? 'animate__fadeInUp' : 'animate__fadeOutDown'
            }`}
          >
            <Link href='/services'>
              <div className='w-100 mt-1 flex-end fs-6 fw-500 text-primary pointer'>
                <span>Lihat Semua</span>
                <i className='las la-arrow-right ms-2 fs-5' />
              </div>
            </Link>
            <Slider {...settings}>
              {data?.map(({ title, file }, index) => (
                <div key={index} className='px-3 py-5 position-relative'>
                  <div className='position-relative h-325px shadow-md-bold hover-xs radius-10 overflow-hidden p-2'>
                    <Image
                      priority
                      quality={30}
                      alt='img'
                      layout='fill'
                      objectFit='cover'
                      src={file || defaultImage}
                    />
                    <div className='absolute-center z-2 flex-center w-100 h-100 hover-anim dark'>
                      <div className='p-2 p-md-4'>
                        <div className='fs-5 fw-500 ls-1 text-white mb-1 text-center'>{title}</div>
                      </div>
                    </div>
                    <div
                      className='position-absolute bottom-0 start-0 w-100 p-2 text-center fs-8 fw-500 text-white pointer mt-2'
                      style={{ background: '#00000033' }}
                    >
                      {title}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
