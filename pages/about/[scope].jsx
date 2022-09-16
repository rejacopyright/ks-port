import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Provider from '@components/about/Provider'
import Meta from '@components/seo/meta'
import { detailAbout } from '@api/about'
import { htmlToString } from '@helpers'
const Index = () => {
  const { query } = useRouter()
  const { scope } = query || {}
  const [detail, setDetail] = useState({})
  useEffect(() => {
    if (scope) {
      detailAbout(scope).then(({ data }) => {
        setDetail(data)
      })
    }
  }, [scope])
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
