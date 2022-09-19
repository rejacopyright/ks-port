import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from '@redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
// import SSRProvider from 'react-bootstrap/SSRProvider'
import LayoutProvider from '@components/layouts/LayoutProvider'
import 'react-toastify/dist/ReactToastify.css'
import '@styles/app.scss'

const DefaultLayout = ({ children }) => children
function MyApp({ Component, pageProps }) {
  const ContentMenu = Component.Layout || DefaultLayout
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LayoutProvider data={pageProps?.header}>
          <ContentMenu>
            <Component {...pageProps} />
          </ContentMenu>
        </LayoutProvider>
        <ToastContainer />
      </PersistGate>
    </ReduxProvider>
  )
}

export default MyApp
