import { useEffect, useState, Fragment } from 'react'
import { Modal } from '@components/modal'
import Slider from 'react-slick'
import defaultImage from '@images/placeholder-image.jpg'
import { getHomePopup } from '@api/home'

export default function Index() {
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    getHomePopup().then(({ data: { data: res } = {} }) => {
      const result = res?.filter(({ status }) => status === 1)
      setData(result)
      setShowModal(result?.length > 0)
    })
  }, [])
  const settings = {
    autoplay: false,
    pauseOnHover: true,
    autoplaySpeed: 5000,
    fade: true,
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: false,
  }
  return (
    <Modal
      size='lg'
      theme='dark'
      bodyClass='p-0'
      show={showModal}
      setShow={setShowModal}
      title={`Detail Assets`}
      buttonText='Detail'
      header={false}
      footer={false}
      // onHide={() => setData([])}
    >
      <div className='row'>
        <div className='col-12'>
          <div className='flex-between p-3 bg-primary text-white'>
            <h6 className='m-0'>Detail</h6>
            <div
              className='btn flex-center btn-white same-20px'
              onClick={() => setShowModal(false)}
            >
              <i className='fas fa-times fs-5 text-white' />
            </div>
          </div>
        </div>
        <div className='col-12 overflow-auto vh-75'>
          <Slider {...settings}>
            {data?.map(({ description, file }, index) => (
              <Fragment key={index}>
                <div className='position-relative'>
                  <div
                    className='position-relative vh-50 overflow-hidden'
                    style={{ background: `url(${file || defaultImage}) center / cover no-repeat` }}
                  />
                </div>
                <div
                  className='w-100 p-3 fs-7'
                  dangerouslySetInnerHTML={{ __html: description?.replace('\n', '<br/>') }}
                />
              </Fragment>
            ))}
          </Slider>
        </div>
      </div>
    </Modal>
  )
}
