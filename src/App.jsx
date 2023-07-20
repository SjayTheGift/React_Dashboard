import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Dashboard from './components/Dashboard'


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";     
import 'primeicons/primeicons.css';                                  
        


function App() {

  return (
    <>
    <Dashboard />
      

    </>
  )
}

export default App
