import { useEffect, useState } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'
import worldMap from '@images/worldmap.png'
import aboutImg from '@images/stock/16.png'
import { useInView } from 'react-intersection-observer'
import { detailAbout } from '@api/about'
import { getHomeAssets } from '@api/home'
import { CardLoader } from '@components/loader'
import { htmlToString } from '@helpers'

const Index = () => {
  const { ref: aboutRef, inView: aboutShow } = useInView({
    threshold: 0.35,
    initialInView: true,
  })
  const { ref: counterRef, inView: counterRefShow } = useInView({
    threshold: 0.5,
    initialInView: true,
  })
  const [detail, setDetail] = useState({})
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    detailAbout('company')
      .then(({ data }) => {
        setDetail(data)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
    getHomeAssets()
      .then(({ data: { data } = {} }) => {
        setAssets(data)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  if (loading) {
    return (
      <div className='container'>
        <CardLoader count={1} className='col-12 mt-5' />
      </div>
    )
  }
  return (
    <>
      <div className='py-5 bg-white my-5'>
        <div className='container'>
          <div className='row flex-start' ref={aboutRef}>
            <div
              className={`col-lg-4 animate__animated ${
                aboutShow ? 'animate__wobble' : 'animate__fadeOutLeft'
              }`}
            >
              <Image
                priority
                alt='img'
                quality={50}
                className='w-100 h-auto opacity-75 mt-n5'
                src={aboutImg}
              />
            </div>
            <div
              className={`col-lg-8 mt-3 animate__animated ${
                aboutShow ? 'animate__fadeInRight' : 'animate__fadeOutUp'
              }`}
            >
              <div className='fs-6 m-0 text-dark mb-3'>About Krakatau Global Solution</div>
              <div className='h4 m-0 fw-600 text-primary mb-2'>PT KRAKATAU SAMUDERA SOLUTION</div>
              <div className='fs-7 m-0 text-dark mb-4 text-truncate-3'>
                {htmlToString(detail?.description)}
              </div>
              <div className='row'>
                <div className='col-auto mb-3'>
                  <Link href='/about/company'>
                    <div className='btn btn-primary flex-center text-white'>
                      <div className='me-2 fs-7'>Overview</div>
                      <i className='las la-arrow-right' />
                    </div>
                  </Link>
                </div>
                <div className='col-auto mb-3'>
                  <Link href='/about/history'>
                    <div className='btn btn-primary flex-center text-white'>
                      <div className='me-2 fs-7'>History</div>
                      <i className='las la-arrow-right' />
                    </div>
                  </Link>
                </div>
                <div className='col-auto mb-3'>
                  <Link href='/about/certification'>
                    <div className='btn btn-primary flex-center text-white'>
                      <div className='me-2 fs-7'>Certification</div>
                      <i className='las la-arrow-right' />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-5 bg-fa mt-n2'>
        <div className='container'>
          <div className='row' ref={counterRef}>
            {assets?.map(({ count, title, description }, index) => (
              <div
                key={index}
                className={`col-lg-3 col-sm-6 mb-5 animate__animated ${
                  counterRefShow ? 'animate__swing' : 'animate__fadeOut'
                }`}
              >
                <div className='h1 text-primary mb-2'>{count}</div>
                <div className='fs-6 fw-500 text-primary mb-1 text-capitalize'>{title}</div>
                <div className='fs-8 text-dark opacity-75'>{description}</div>
              </div>
            ))}
          </div>
          <div className='row d-none'>
            <div className='col-12 mb-5'>
              <div className='position-relative mt-5'>
                <Image
                  priority
                  alt='img'
                  quality={50}
                  className='w-100 h-auto opacity-75'
                  src={worldMap}
                />
                <div className='absolute-center'>
                  <div className='btn btn-lg btn-icon btn-info radius-50 pulse'>
                    <i className='las la-play fs-1' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
