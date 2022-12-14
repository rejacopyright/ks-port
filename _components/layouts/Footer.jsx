import Link from 'next/link'
import Image from 'next/image'
import logo from '@images/logo-white.png'
import Socmed from '@components/button/socmed'

const Index = () => {
  const data = [
    'Career',
    'Subsidiaries & Affiliate',
    'How to Order',
    'Contact Us',
    'Online Service',
    'Terms of Use',
  ]
  return (
    <div className='py-2 bg-25'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 mt-4 mb-2'>
            <div className='position-relative h-30px opacity-50'>
              <Image priority quality={30} alt='img' layout='fill' objectFit='contain' src={logo} />
            </div>
          </div>
        </div>
        <hr className='mb-4 border-white' />
        <div className='row'>
          <div className='col-12 col-md-8 offset-md-2 mb-5'>
            <div className='row'>
              {data?.map((m, index) => (
                <div key={index} className='col-sm-6 col-lg-4 text-center mb-2'>
                  <Link href='/'>
                    <a className='fs-7 text-link text-white text-hover-underline underline-offset-5'>
                      {m}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 text-center my-3 opacity-50'>
            <p className='text-white ls-1 mb-1'>© Copyright 2021 Krakatau International Port</p>
            <p className='text-white ls-1'>All Rights Reserved</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 mb-2'>
            <Socmed placement='top' className='' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
