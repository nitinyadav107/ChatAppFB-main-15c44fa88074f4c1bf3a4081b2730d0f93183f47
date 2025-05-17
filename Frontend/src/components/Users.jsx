import React, { useState } from 'react'
import User from './User'
import useGetAllUser from '../context/useGetAllUser';

const Users = () => {
   const loginUser = JSON.parse(localStorage.getItem('ChatApp'));
   const [allUsers, setAllUsers] = useGetAllUser();
   console.log(allUsers);
   
  return (
    <div>
      <h1 className='px-8 py-3 text-white font-semibold bg-slate-800 rounded-lg'>  Messages</h1>
      <div className='element-class overflow-y-scroll h-[calc(100vh-12rem)] '>
        {
         
          allUsers
            .filter(user => user._id !== loginUser.id)
            .map((user, index) => (
              <User key={index} user={user} />
            ))
             
          

        }
       

      </div>




    </div>
  )
}

export default Users
