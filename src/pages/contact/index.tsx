import { detailBanner } from '@api/banner'
import { getContact } from '@api/settings'
import Banner from '@components/banner'
import { CardLoader } from '@components/loader'
import { FC, useEffect, useState } from 'react'

const Index: FC<any> = () => {
  const [detail, setDetail] = useState<any>({})
  const [loading, setLoading] = useState<any>(false)
  const [banner, setBanner] = useState<any>(undefined)
  useEffect(() => {
    detailBanner('contact').then(({ data }) => {
      setBanner(data?.file)
    })
  }, [])
  useEffect(() => {
    document.title = 'Contact Us'
    setLoading(true)
    getContact()
      .then(({ data }) => {
        setDetail(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return (
    <>
      <Banner height='150' content={<div className='fs-5'></div>} src={banner} />
      <div className='container my-5'>
        {loading ? (
          <CardLoader count={2} className='col-12 my-3' />
        ) : (
          <div className='text-center'>
            <div className='fs-3 fw-500 mb-3'>Contact Us</div>
            <div
              className='w-100 overflow-auto'
              dangerouslySetInnerHTML={{ __html: detail?.contact }}
            />
            {detail?.whatsapp && (
              <div className='my-3'>
                <a
                  href={`https://wa.me/62${detail?.whatsapp}`}
                  target='_blank'
                  className='btn btn-success d-inline-flex align-items-start text-white px-3'
                  rel='noreferrer'
                >
                  <i className='lab la-whatsapp fs-5 me-1' />
                  <span className='fs-7'>Whatsapp</span>
                </a>
              </div>
            )}
            <div className='mt-5'>
              <iframe
                title='location'
                className='col-12'
                width='600'
                height='300'
                id='gmap_canvas'
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  detail?.map
                )}&t=&z=13&output=embed`}
                frameBorder='0'
                scrolling='no'
                marginHeight={0}
                marginWidth={0}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default Index
