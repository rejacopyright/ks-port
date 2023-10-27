import { getHomePopup } from '@api/home'
import { Modal } from '@components/modal'
import defaultImage from '@images/placeholder-image.jpg'
import { Fragment, useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function Index() {
  const [showModal, setShowModal] = useState<any>(false)
  const [data, setData] = useState<any>([])
  const [title, setTitle] = useState<any>('')
  useEffect(() => {
    getHomePopup().then(({ data: { data: res } = {} }) => {
      const result = res?.filter(({ status }: any) => status === 1)
      setTitle(result?.[0]?.title)
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
    afterChange: (current: any) => {
      setTitle(data?.[current]?.title || '')
    },
  }
  return (
    <Modal
      size='lg'
      theme='dark'
      bodyClass='p-0'
      show={showModal}
      setShow={setShowModal}
      title={title}
      buttonText='Detail'
      header={false}
      footer={false}
      scrollable={false}
      // onHide={() => setData([])}
    >
      <div className='d-flex flex-row flex-wrap position-relative'>
        <div className='col-12 position-relative'>
          <div className='position-absolute end-0 top-0 z-9 m-2'>
            <div
              className='btn btn-sm flex-center same-30px radius-50'
              style={{ background: 'rgba(255,255,255,0.25)' }}
            >
              <i className='las la-times fs-5 text-dark' />
            </div>
          </div>
          <div className=''>
            <Slider {...settings}>
              {data?.map(({ description, file }: any, index: any) => (
                <Fragment key={index}>
                  <div className='position-relative'>
                    <img src={file} alt='' className='w-100' />
                    <div
                      className='position-relative h-100 overflow-hidden'
                      style={{
                        background: `url(${file || defaultImage}) center / contain no-repeat`,
                      }}
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
      </div>
    </Modal>
  )
}
