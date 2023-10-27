import About from '@components/home/about'
import Banner from '@components/home/banner2'
import Customer from '@components/home/customer'
import News from '@components/home/news'
import Service from '@components/home/service'
import { companyName } from '@helpers'
import { useEffect } from 'react'

import Popup from './popup'

export default function Home() {
  useEffect(() => {
    document.title = companyName
  }, [])
  return (
    <div>
      <Banner />
      <About />
      <Service />
      <Customer />
      <News />
      <Popup />
    </div>
  )
}
