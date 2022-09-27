import { useEffect } from 'react'
import { getAnalytics } from '@api/dashboard'
const Index = () => {
  useEffect(() => {
    getAnalytics().then(({ data }) => {
      console.log(data)
    })
  }, [])
  return (
    <div className='row'>
      <div className='col-12'>
        <div className='mt-2'>Dashboard</div>
      </div>
    </div>
  )
}

export default Index
