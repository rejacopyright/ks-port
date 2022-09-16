import { useEffect, useState } from 'react'
import Provider from '@components/about/Provider'
import Meta from '@components/seo/meta'
import { getAbout } from '@api/about'
import { htmlToString } from '@helpers'
const Index = () => {
  const [detail, setDetail] = useState({})
  useEffect(() => {
    getAbout().then(({ data: { data } = {} }) => {
      setDetail(data?.[0])
    })
  }, [])
  return (
    <>
      <Meta
        title={detail?.title || 'Company Profile'}
        description={htmlToString(detail?.description)}
      />
      <div className='fs-4 fw-500 mb-2'>{detail?.title || 'Company Profile'}</div>
      <div className='w-100' dangerouslySetInnerHTML={{ __html: detail?.description }} />
    </>
  )
}
Index.Layout = Provider
export default Index
