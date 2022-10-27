import { Link } from 'react-router-dom'
import logo from '@images/logo-white.png'
import Socmed from '@components/button/socmed'
import { appName } from '@helpers/config'

const Index = () => {
  const data = [
    { name: 'Career', path: '/news/carreer' },
    { name: 'About Us', path: '/about' },
    { name: 'Certification', path: '/about/certification' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Services', path: '/services' },
    { name: 'Terms of Use', path: '/terms-of-use' },
  ]
  return (
    <div className='py-2 bg-25'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 mt-4 mb-2'>
            <div
              className='position-relative h-30px opacity-50'
              style={{ background: `url(${logo}) center / contain no-repeat` }}
            />
          </div>
        </div>
        <hr className='mb-4 border-white' />
        <div className='row'>
          <div className='col-12 col-md-8 offset-md-2 mb-5'>
            <div className='row'>
              {data?.map(({ name, path }, index) => (
                <div key={index} className='col-sm-6 col-lg-4 text-center mb-2'>
                  <Link
                    to={path}
                    className='fs-7 text-link text-white text-hover-underline underline-offset-5'
                  >
                    {name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 text-center my-3 opacity-50'>
            <p className='text-white ls-1 mb-1 text-capitalize'>© Copyright 2022 {appName}</p>
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
