import React from 'react'
import { ToastContainer } from 'react-toastify'
import Left from './Left'
import Right from './Right'
import Menu from './Menu'

const Home = () => {
  return (
    <div className='flex h-screen'>
      <ToastContainer />
      <Menu/>
      <Left/>
      <Right />
    </div>
  )
}

export default Home
