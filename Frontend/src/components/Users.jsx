// Users.jsx
import React, { useState, useEffect } from 'react';
import User from './User';
import useGetAllUser from '../context/useGetAllUser';
import Search from './Search';

const Users = () => {
  const loginUser = JSON.parse(localStorage.getItem('ChatApp'));
  const [allUsers] = useGetAllUser(); // original list from context
  const [filteredUsers, setFilteredUsers] = useState([]); // displayed list
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Filter out self from the list
    const usersToShow = allUsers.filter(user => user._id !== loginUser.id);
    setFilteredUsers(usersToShow);
  }, [allUsers]);

  useEffect(() => {
    const query = searchTerm.toLowerCase();
    const filtered = allUsers.filter(
      (user) =>
        user._id !== loginUser.id &&
        user.fullname.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers]);

  return (
    <div>
      <Search onSearch={setSearchTerm} />
      <h1 className='px-8 py-3 text-white font-semibold bg-slate-800 rounded-lg'>Messages</h1>
      <div className='element-class overflow-y-scroll h-[calc(100vh-12rem)]'>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => <User key={index} user={user} />)
        ) : (
          <p className="text-gray-400 text-center py-4">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
