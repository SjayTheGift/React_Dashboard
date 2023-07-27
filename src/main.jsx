import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router  } from 'react-router-dom'



import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </Router>
  </Provider>,
)
