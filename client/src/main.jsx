import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'normalize.css'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import ScrollToTop from './components/scroolToTop'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>
)
