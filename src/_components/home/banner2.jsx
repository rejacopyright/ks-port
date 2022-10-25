import { useState } from 'react'
// import banner from '@images/banner.jpg'
import Slider from 'react-slick'
import { useEffect } from 'react'
import { getHomeBanner } from '@api/home'
import ProgressBar from 'react-bootstrap/ProgressBar'

const ActionBtn = () => {
  return (
    <div className='animate__animated animate__fadeInUpBig animate__faster row flex-center'>
      <div className='col-auto mb-3'>
        <div
          className='btn bg-gradient flex-center text-white py-md-3'
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div className='me-2 fs-8 text-nowrap'>LEBIH LANJUT</div>
          <i className='las la-arrow-right' />
        </div>
      </div>
      <div className='col-auto mb-3'>
        <div
          className='btn btn-dangers bg-gradients flex-center text-white py-md-3'
          style={{ background: 'rgba(255,0,0,0.5)' }}
        >
          <i className='lab la-youtube me-2 fs-3 lh-0px' />
          <div className='fs-8 text-nowrap'>LIHAT VIDEO</div>
        </div>
      </div>
    </div>
  )
}
const Index = () => {
  const [activeImg, setActiveImg] = useState(0)
  const [loading, setLoading] = useState(false)
  const [percent, setPercent] = useState(10)
  const [data, setData] = useState([
    {
      title: 'PT KRAKATAU SAMUDERA SOLUTION',
      description:
        'Krakatau Samudera Solution is the largest international hub and bulk port in Indonesia, with an installed capacity of 25 million tons per year, integrated with logistics facilities',
      // file: banner,
    },
  ])
  useEffect(() => {
    setLoading(true)
    const time = setInterval(() => {
      setPercent((prev) => prev + 1)
    }, 100)
    getHomeBanner()
      .then(({ data: { data } = {} }) => {
        if (data?.length > 0) {
          setData(data)
        }
      })
      .finally(() => {
        setPercent(100)
        clearInterval(time)
        setTimeout(() => {
          setLoading(false)
        }, 200)
      })
    return () => {
      clearInterval(time)
    }
  }, [])
  const settings = {
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 5000,
    dots: true,
    arrows: true,
    infinite: true,
    centerMode: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (current) => {
      setActiveImg(current)
    },
  }
  const styles = {
    background:
      'linear-gradient(180deg, rgba(0,51,105,0.5) 0%, rgba(0,51,105,0.25) 100%, rgba(255,255,255,0) 100%)',
  }
  if (loading) {
    return (
      <div
        className='vh-100 position-relative bg-white'
        // style={{ background: `url(${banner}) center / cover no-repeat`, filter: 'blur(100px)' }}
      >
        <div className='position-absolute h-110px w-100 bg-primary' />
        <div
          className='flex-center position-absolute w-100 h-100'
          style={{
            zIndex: 1,
            // background: 'rgba(0,0,0,0.5)',
          }}
        >
          <div className='w-50'>
            <ProgressBar className='h-5px' animated now={percent} label='' />
            <div className='text-center text-dark mt-1 fs-8'>Loading in progress...</div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <Slider {...settings}>
      {data?.map(({ title, description, file }, index) => (
        <div key={index} className='px-3-xxx py-3-xxx position-relative'>
          <div
            className='position-relative vh-100 radius-10-xxx overflow-hidden'
            style={{ background: `url(${file}) center / cover no-repeat` }}
          >
            <div
              className='flex-center position-absolute w-100 h-100'
              style={{
                zIndex: 1,
                background: styles?.background,
              }}
            >
              {activeImg === index && (
                <div className='w-75 text-center'>
                  <div className='text-white h3 ls-1 lh-35px fw-bolder text-uppercase animate__animated animate__fadeInUp animate__faster mb-2'>
                    {title}
                  </div>
                  <div className='text-white fs-6 animate__animated animate__fadeInUp'>
                    {description}
                  </div>
                  {false && <ActionBtn />}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  )
}
export default Index
