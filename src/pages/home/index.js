import Banner from '@components/home/banner2'
import About from '@components/home/about'
import Service from '@components/home/service'
import Customer from '@components/home/customer'
import News from '@components/home/news'
import Popup from './popup'

export default function Home() {
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
