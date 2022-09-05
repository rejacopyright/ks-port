import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

const Index = () => {
  const { ref: titleRef, inView: titleShow } = useInView({
    threshold: 0.5,
    initialInView: true,
  })
  const { ref: iconRef, inView: iconShow } = useInView({
    threshold: 0.25,
    initialInView: true,
  })
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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, consectetur
              voluptatum quis nam quas ipsum exercitationem iste eligendi quae quisquam!
            </div>
          </div>
        </div>
        {/* <hr className='mb-5 border-primary' /> */}
        <div className='row' ref={iconRef}>
          {Array(12)
            ?.fill('')
            ?.map((_m, index) => (
              <div
                key={index}
                className={`col-6 col-sm-3 col-lg-2 mb-5 text-center animate__animated animate__slower ${
                  iconShow ? 'animate__fadeIn' : 'animate__fadeOut'
                }`}
              >
                <div className='position-relative mx-auto same-75px bg-white radius-20 mb-2 overflow-hidden border border-1 border-warning shadow-md'>
                  <Image
                    priority
                    quality={30}
                    alt='img'
                    layout='fill'
                    objectFit='contain'
                    className='p-1'
                    src={require(`@images/customers/${index + 1}.png`)}
                  />
                </div>
                <div className='fs-8 fw-400 text-dark'>Customer Name {index + 1}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Index
