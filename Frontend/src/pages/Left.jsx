import React from 'react'
import Search from '../components/Search'
import Users from '../components/Users'
import Logout from '../components/Logout'

const Left = () => {
  return (
    <div className=' bg-gray-900 w-[30%] text-gray-200'>
      <Search/>
      <Users/>
     
      
    </div>
  )
}

export default Left
