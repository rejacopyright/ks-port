import 'react-toastify/dist/ReactToastify.css'
import '@styles/app.scss'

import { persistor, store } from '@redux'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'

import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from './routes'

// const App = () => useRoutes(routes)

const root = createRoot(document.getElementById('root')!)

root.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter />
      <ToastContainer />
    </PersistGate>
  </ReduxProvider>
)

reportWebVitals()
