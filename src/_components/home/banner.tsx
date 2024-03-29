import banner1 from '@images/banner4.jpg'
import banner2 from '@images/banner5.jpg'
import banner3 from '@images/banner6.jpg'
import { FC, useState } from 'react'
import Slider from 'react-slick'

const ActionBtn: FC<any> = () => {
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
const Index: FC<any> = () => {
  const [activeImg, setActiveImg] = useState<any>(0)
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: any) => {
      setActiveImg(current)
    },
  }
  const styles = {
    background:
      'linear-gradient(180deg, rgba(0,51,105,0.75) 0%, rgba(0,51,105,0.75) 50%, rgba(255,255,255,0) 100%)',
  }
  const data = [banner1, banner2, banner3]
  return (
    <Slider {...settings}>
      {data?.map((m, index) => (
        <div
          key={index}
          className='vh-50 position-relative'
          style={{ background: `url(${m}) center / cover no-repeat` }}
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
                  Unlimited Solutions For Port & Marine Supporting Services
                </div>
                <div className='text-white fs-6 animate__animated animate__fadeInUp'>
                  Dengan kapasitas terpasang mencapai 25 Juta Ton per tahun yang terintegrasi dengan
                  fasilitas logistik
                </div>
                {false && <ActionBtn />}
              </div>
            )}
          </div>
        </div>
      ))}
    </Slider>
  )
}
export default Index
