import React from 'react'
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from '../context/AuthProvider';
const Logout = () => {
  const { logout } = useAuth();
  return (
    <div onClick ={logout} className='px-4 py-4 '>
      <RiLogoutBoxLine size={40} className='cursor-pointer hover:bg-slate-800 p-2 duration-300 ' />
    </div>
  )
}

export default Logout
