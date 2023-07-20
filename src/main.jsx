import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter as Router  } from 'react-router-dom'



import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
    </Router>
  </React.StrictMode>,
)
