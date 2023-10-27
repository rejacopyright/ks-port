import { getAnalytics } from '@api/dashboard'
import { CardLoader } from '@components/loader'
import { FC, useEffect, useState } from 'react'

import Pages from './pages'
import Report from './report'
import Visitor from './visitor'

const Index: FC<any> = () => {
  const [report, setReport] = useState<any>([])
  const [v, setV] = useState<any>({})
  const [pages, setPages] = useState<any>([])
  const [loading, setLoading] = useState<any>(false)
  useEffect(() => {
    setLoading(true)
    getAnalytics()
      .then(({ data }) => {
        const { report: reports, visitor, mostVisitedPages } = data || {}
        setV({
          categories: visitor?.map(({ day }: any) => day),
          visitors: visitor?.map(({ activeUsers }: any) => activeUsers),
          pageViews: visitor?.map(({ screenPageViews }: any) => screenPageViews),
        })
        setReport(reports)
        setPages(mostVisitedPages)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className='mt-4'>
        <CardLoader count={6} className='col-md-4 col-sm-6 mb-3' />
      </div>
    )
  }

  return (
    <div className='row'>
      <div className='col-12 mb-4'>
        <Visitor categories={v?.categories} visitors={v?.visitors} pageViews={v?.pageViews} />
      </div>
      <div className='col-12 mb-4'>
        <Report data={report} />
      </div>
      <div className='col-12 mb-3'>
        <Pages data={pages} />
      </div>
    </div>
  )
}

export default Index
