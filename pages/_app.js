import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from '@redux'
import { PersistGate } from 'redux-persist/integration/react'
import SSRProvider from 'react-bootstrap/SSRProvider'
import LayoutProvider from '@components/layouts/LayoutProvider'
import '@styles/app.scss'

const DefaultLayout = ({ children }) => children
function MyApp({ Component, pageProps }) {
  const ContentMenu = Component.Layout || DefaultLayout
  return (
    <SSRProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LayoutProvider>
            <ContentMenu>
              <Component {...pageProps} />
            </ContentMenu>
          </LayoutProvider>
        </PersistGate>
      </ReduxProvider>
    </SSRProvider>
  )
}

export default MyApp
