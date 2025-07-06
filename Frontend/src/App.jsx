import { useState } from 'react'
import './App.css'
import Left from './pages/Left'
import Right from './pages/Right'
import Signup from './components/Signup'
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom'

import VerifyEmail from './components/VerifyEmail'
import Home from './pages/Home'
import { useAuth } from './context/AuthProvider'

function App() {
  const { authUser }=useAuth();
  

  return (
    <Routes>
      <Route path='/verify' element={<VerifyEmail />} />
      <Route path='/' element={ <Signup/> }/>
      {
      (authUser)? <Route path='/home' element={ <Home/> }/> :<Route path='/home' element={ <Signup/> }/>
      }
      
      
    </Routes>
  )
}

export default App

