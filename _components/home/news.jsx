import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import banner4 from '@images/banner4.jpg'
import banner5 from '@images/banner5.jpg'
import banner6 from '@images/banner6.jpg'
import banner7 from '@images/banner7.jpg'

const Index = () => {
  const { ref: titleRef, inView: titleShow } = useInView({
    threshold: 0.5,
    initialInView: true,
  })
  const { ref: iconRef, inView: iconShow } = useInView({
    threshold: 0.25,
    initialInView: true,
  })
  const data = [banner4, banner5, banner6, banner7]
  return (
    <div className='py-5 bg-white mt-n2'>
      <div className='container'>
        <div className='row my-5' ref={titleRef}>
          <div
            className={`col-12 text-center animate__animated ${
              titleShow ? 'animate__fadeInUp' : 'animate__fadeOutBottom'
            }`}
          >
            <div className='h4 m-0 text-primary mb-2'>NEWS & ACTIVITY</div>
            <div className='fs-7 m-0 text-dark mb-3'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, consectetur
              voluptatum quis nam quas ipsum exercitationem iste eligendi quae quisquam!
            </div>
          </div>
        </div>
        <div className='row justify-content-center' ref={iconRef}>
          {data?.map((m, index) => (
            <div
              key={index}
              className={`col-auto mb-5 text-center animate__animated ${
                iconShow ? 'animate__fadeIn' : 'animate__fadeOut'
              }`}
            >
              <div className='radius-10 overflow-hidden bg-white shadow-sm hover-lg-bold'>
                <div className='position-relative same-200px bg-white overflow-hidden'>
                  <Image priority quality={30} alt='img' layout='fill' objectFit='cover' src={m} />
                </div>
                <div className='p-3 w-200px'>
                  <div className='fs-7 fw-600 text-primary mb-2 text-truncate-2'>
                    Lorem Ipsum Dolor Sit Amet {index + 1}
                  </div>
                  <div className='fs-8 fw-500 text-bb text-truncate-2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aspernatur
                    assumenda mollitia maiores fugiat, dicta adipisci qui praesentium ab. Molestiae!
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div
            className={`col-auto mb-5 text-center animate__animated ${
              iconShow ? 'animate__fadeIn' : 'animate__fadeOut'
            }`}
          >
            <div className='radius-10 opacity-50 h-100 flex-center overflow-hidden bg-f5 shadow-sms border border-dashed border-primary pointer text-hover-underline underline-offset-2'>
              <div className='p-3 w-200px'>
                <div className='fs-7 fw-700 ls-1 text-primary text-truncate-2'>SEE MORE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
