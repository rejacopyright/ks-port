import { Suspense } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from '@redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import '@styles/app.scss'
import routes from './routes'
import reportWebVitals from './reportWebVitals'

const App = () => useRoutes(routes)

const root = createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense>
          <App />
        </Suspense>
        <ToastContainer />
      </PersistGate>
    </ReduxProvider>
  </BrowserRouter>
)

reportWebVitals()
