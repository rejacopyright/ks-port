import Image from 'next/image'
import Link from 'next/link'
import Provider from '@components/news/Provider'
import Meta from '@components/seo/meta'
const media = [
  { name: 'Crew Change', src: require('@images/banner1.jpg').default },
  { name: 'Ship Charter', src: require('@images/banner2.jpg').default },
  { name: 'Ship Emergency Call', src: require('@images/banner3.jpg').default },
  { name: 'Fuel Bunkering', src: require('@images/banner4.jpg').default },
  { name: 'Shore Connection', src: require('@images/banner5.jpg').default },
  { name: 'Ship Repair', src: require('@images/banner6.jpg').default },
  { name: 'Waste Management', src: require('@images/banner7.jpg').default },
  { name: 'Parking & Traffic Management', src: require('@images/banner1.jpg').default },
  { name: 'Fleet Maintenance', src: require('@images/banner2.jpg').default },
]
const Index = () => {
  return (
    <>
      <Meta title='Media' description={undefined} />
      <div className='row'>
        {media.map(({ src }, index) => (
          <div key={index} className='col-sm-6 col-lg-4 mb-5 flex-column-reverse'>
            <div className='position-relative radius-10 overflow-hidden bg-white shadow-sm hover-lg-bold h-100'>
              <div className='position-relative h-150px bg-white overflow-hidden'>
                <Image priority quality={30} alt='img' layout='fill' objectFit='cover' src={src} />
              </div>
              <div className='p-3 w-200px mb-5'>
                <div className='fs-8 fw-500 mb-2 text-truncate-2'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, similique!
                </div>
                <div className='fs-9 fw-300 text-bb text-truncate-3'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aspernatur
                  assumenda mollitia maiores fugiat, dicta adipisci qui praesentium ab. Molestiae!
                </div>
              </div>
              <div className='absolute-center-h bottom-0 mb-3'>
                <Link href={`/news/media/${index + 1}`}>
                  <div className='btn btn-sm btn-light-primary fs-8'>Read more</div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
Index.Layout = Provider
export default Index
