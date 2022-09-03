import Image from 'next/future/image'
import worldMap from '@images/worldmap.png'
import { useInView } from 'react-intersection-observer'
const Index = () => {
  const { ref: aboutRef, inView: aboutShow } = useInView({
    threshold: 0.5,
    initialInView: true,
  })
  const { ref: counterRef, inView: counterRefShow } = useInView({
    threshold: 0.5,
    initialInView: true,
  })
  return (
    <div className='py-5 bg-primary mt-n2'>
      <div className='container'>
        <div className='row mb-5' ref={aboutRef}>
          <div
            className={`col-lg-8 animate__animated ${
              aboutShow ? 'animate__fadeInLeft' : 'animate__fadeOutLeft'
            }`}
          >
            <div className='fs-6 m-0 text-white mb-3'>About Krakatau Global Solution</div>
            <div className='h4 m-0 text-white mb-2'>PT KRAKATAU SAMUDERA SOLUTION</div>
            <div className='fs-7 m-0 text-white mb-4'>
              Krakatau Samudera Solution is the largest international hub and bulk port in
              Indonesia, with an installed capacity of 25 million tons per year, integrated with
              logistics facilities
            </div>
            <div className='row'>
              <div className='col-auto mb-3'>
                <div
                  className='btn btn-primary flex-center text-white'
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <div className='me-2 fs-7'>Overview</div>
                  <i className='las la-arrow-right' />
                </div>
              </div>
              <div className='col-auto mb-3'>
                <div
                  className='btn btn-primary flex-center text-white'
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <div className='me-2 fs-7'>History</div>
                  <i className='las la-arrow-right' />
                </div>
              </div>
              <div className='col-auto mb-3'>
                <div
                  className='btn btn-primary flex-center text-white'
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <div className='me-2 fs-7'>Certification</div>
                  <i className='las la-arrow-right' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className='my-5 border-white' />
        <div className='row' ref={counterRef}>
          <div
            className={`col-lg-3 col-sm-6 mb-5 animate__animated ${
              counterRefShow ? 'animate__swing' : 'animate__fadeOut'
            }`}
          >
            <div className='h1 text-white mb-2'>25+</div>
            <div className='fs-6 fw-500 text-white mb-1'>Million Tons/Year</div>
            <div className='fs-8 text-white opacity-75'>
              The biggest international hub & bulk port in Indonesia
            </div>
          </div>
          <div
            className={`col-lg-3 col-sm-6 mb-5 animate__animated ${
              counterRefShow ? 'animate__swing' : 'animate__fadeOut'
            }`}
          >
            <div className='h1 text-white mb-2'>17</div>
            <div className='fs-6 fw-500 text-white mb-1'>Slots Jetty</div>
            <div className='fs-8 text-white opacity-75'>
              Equipped with the best jetty facilities for loading & unloading
            </div>
          </div>
          <div
            className={`col-lg-3 col-sm-6 mb-5 animate__animated ${
              counterRefShow ? 'animate__swing' : 'animate__fadeOut'
            }`}
          >
            <div className='h1 text-white mb-2'>-21</div>
            <div className='fs-6 fw-500 text-white mb-1'>Meter Low Water Spring</div>
            <div className='fs-8 text-white opacity-75'>
              Accommodated various type of vessels ranging from 10.000 - 200.000 DWT (super capesize
              vessel)
            </div>
          </div>
          <div
            className={`col-lg-3 col-sm-6 mb-5 animate__animated ${
              counterRefShow ? 'animate__swing' : 'animate__fadeOut'
            }`}
          >
            <div className='h1 text-white mb-2'>20K+</div>
            <div className='fs-6 fw-500 text-white mb-1'>Metric Tons/Day</div>
            <div className='fs-8 text-white opacity-75'>
              High discharging rate for food & feed cargos
            </div>
          </div>
        </div>
        <div className='row'>
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
  )
}

export default Index
