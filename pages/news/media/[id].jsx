import Meta from '@components/seo/meta'
import Image from 'next/image'
import Link from 'next/link'
import Banner from '@components/banner'
import banner from '@images/banner1.jpg'

const Breadcrumb = () => {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'>
          <Link href='/news'>
            <a>News</a>
          </Link>
        </li>
        <li className='breadcrumb-item'>
          <Link href='/news/media'>
            <a>Media</a>
          </Link>
        </li>
        <li className='breadcrumb-item active' aria-current='page'>
          Detail
        </li>
      </ol>
    </nav>
  )
}

const Index = () => {
  return (
    <>
      <Meta title='Kontak Kami' description={undefined} />
      <Banner height='125' content={false} />
      <div className='container py-4'>
        <div className='row'>
          <div className='col-12 mb-3'>
            <Breadcrumb />
          </div>
        </div>
        <div className='row'>
          <div className='col-12 mb-5'>
            <div className='position-relative h-300px bg-white overflow-hidden radius-10 shadow-lg-bold mb-3'>
              <Image priority quality={30} alt='img' layout='fill' objectFit='cover' src={banner} />
            </div>
            <div className='flex-end'>
              <i className='las la-user me-1 fs-6 text-primary' />
              <div className='text-primary'>Uploaded by Admin</div>
              <div className='text-aa mx-2'>-</div>
              <div className='text-aa'>18 Mei 1992, 12:00 AM</div>
              <i className='las la-clock ms-1 fs-7 text-aa' />
            </div>
          </div>
          <div className='col-12'>
            <div className='fs-4 fw-500 mb-3'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet molestias doloremque
              quia ratione earum blanditiis.
            </div>
            <div className='fs-6'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa deleniti fugiat dolore
              non inventore laudantium commodi provident odit error. Perspiciatis maxime nesciunt
              libero minima aliquam numquam minus debitis odio dolor!
            </div>
            <div className='flex-start w-100 my-3'>
              {[1, 2, 3].map((_m, index) => (
                <div
                  key={index}
                  className='position-relative same-100px bg-white overflow-hidden radius-10 me-3'
                >
                  <Image
                    priority
                    quality={30}
                    alt='img'
                    layout='fill'
                    objectFit='cover'
                    src={banner}
                  />
                </div>
              ))}
            </div>
            {Array(10)
              .fill('')
              .map((_m, index) => (
                <div key={index} className='fs-6 my-3'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa deleniti fugiat
                  dolore non inventore laudantium commodi provident odit error. Perspiciatis maxime
                  nesciunt libero minima aliquam numquam minus
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Index
