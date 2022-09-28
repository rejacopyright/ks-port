import { useEffect, useState } from 'react'
import { getAnalytics } from '@api/dashboard'
import { CardLoader } from '@components/loader'
import Visitor from './visitor'
import Report from './report'
import Pages from './pages'

const Index = () => {
  const [report, setReport] = useState([])
  const [v, setV] = useState({})
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getAnalytics()
      .then(({ data }) => {
        const { report: reports, visitor, mostVisitedPages } = data || {}
        setV({
          categories: visitor?.map(({ day }) => day),
          visitors: visitor?.map(({ visitors }) => visitors),
          pageViews: visitor?.map(({ pageViews }) => pageViews),
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
