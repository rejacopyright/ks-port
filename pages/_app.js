import SSRProvider from 'react-bootstrap/SSRProvider'
import '@styles/app.scss'

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
    </SSRProvider>
  )
}

export default MyApp
