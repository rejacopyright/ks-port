import Head from 'next/head'
import { useRouter } from 'next/router'
import { host } from '@helpers/config'
// const banner = require('@images/banner.jpg').default
const Index = ({
  title = 'Krakatau Business Solution',
  description = 'Dengan kapasitas terpasang mencapai 25 Juta Ton per tahun yang terintegrasi dengan fasilitas logistik',
  img = host + '/images/banner.jpg',
}) => {
  const router = useRouter()
  const fullPath = host + (router?.asPath || router?.pathname)
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content={fullPath} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={img} />

      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={fullPath} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={img}></meta>
    </Head>
  )
}

export default Index
