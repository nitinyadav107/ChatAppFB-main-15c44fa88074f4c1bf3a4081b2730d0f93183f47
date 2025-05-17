import { useState } from 'react'
import './App.css'
import Left from './pages/Left'
import Right from './pages/Right'
import Signup from './components/Signup'
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom'

import VerifyEmail from './components/VerifyEmail'
import Home from './pages/Home'

function App() {
  

  return (
    <Routes>
      <Route path='/verify' element={<VerifyEmail />} />
      <Route path='/' element={ <Signup/> }/>
      <Route path='/home' element={ <Home/> }/>
    </Routes>
  )
}

export default App

