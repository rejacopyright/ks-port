import Head from 'next/head'
import Banner from '@components/home/banner'
import About from '@components/home/about'
import Service from '@components/home/service'
import Customer from '@components/home/customer'
import News from '@components/home/news'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Krakatau Global Solution</title>
        <meta name='name' content='content' />
      </Head>
      <Banner />
      <About />
      <Service />
      <Customer />
      <News />
    </div>
  )
}
