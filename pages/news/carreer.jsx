import Link from 'next/link'
import Provider from '@components/news/Provider'
import Meta from '@components/seo/meta'
const data = [
  'Principal Back End Engineer (Bandung Office)',
  'Head of Special Project - Global Tech Company',
  'Social Event Sales Manager',
  'Merchant Acquisition',
  'Business Development Manager',
  'Human Resources Supervisor',
  'Account Executive',
  'Tax Officer',
  'VP Public Relations',
]
const Index = () => {
  return (
    <>
      <Meta title='Carreer' description={undefined} />
      <div className='row'>
        {data.map((m, index) => (
          <div key={index} className='col-sm-6 col-lg-4 mb-3 flex-column-reverse'>
            <div className='position-relative radius-10 overflow-hidden bg-white shadow-sm hover-lg-bold h-100'>
              <div className='p-3 w-200px mb-5'>
                <div className='fs-7 fw-500 mb-2 text-truncate-2'>{m}</div>
                <div className='fs-9 fw-300 text-bb text-truncate-3'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aspernatur
                  assumenda mollitia maiores fugiat, dicta adipisci qui praesentium ab. Molestiae!
                </div>
              </div>
              <div className='position-absolute bottom-0 m-3'>
                <Link href='#' scroll={false}>
                  <div className='btn btn-sm btn-light-primary fs-8'>See or Apply</div>
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
