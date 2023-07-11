import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import 'rsuite/dist/rsuite.min.css';
import { BrowserRouter } from "react-router-dom"
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { CookiesProvider } from 'react-cookie';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
       <CookiesProvider>
          <App />
        </CookiesProvider>
        </PersistGate >
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
