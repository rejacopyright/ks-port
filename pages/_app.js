import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from '@redux'
import { PersistGate } from 'redux-persist/integration/react'
import SSRProvider from 'react-bootstrap/SSRProvider'
import LayoutProvider from '@components/layouts/LayoutProvider'
import '@styles/app.scss'

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LayoutProvider>
            <Component {...pageProps} />
          </LayoutProvider>
        </PersistGate>
      </ReduxProvider>
    </SSRProvider>
  )
}

export default MyApp
