import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='id'>
        <Head>
          <link rel='icon' type='image/png' href='/images/favicon.png'></link>
          <Script src='froala-editor/js/plugins.pkgd.min.js' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
