import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './redux/slices/store.js'
import { Provider } from 'react-redux';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>

)
