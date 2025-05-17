import React, { useState, useEffect } from 'react';
import {
  IoSettingsOutline,
  IoChatbubbleEllipsesOutline,
  IoCallOutline,
  IoPeopleOutline,
  IoCloseCircleOutline
} from "react-icons/io5";
import Logout from '../components/Logout';
import axios from 'axios';

const Menu = () => {
  // Assume localStorage only contains the user id or token
  const storedUser = JSON.parse(localStorage.getItem('ChatApp')); // e.g., just the id

 
  // For file upload, store the selected file separately
  const [file, setFile] = useState(null);
  const [fullname,setFullname] = useState(storedUser.fullname);
  const [email,setEmail] = useState(storedUser.email);
  const[image,setImage] = useState('');
  // State to manage sidebar visibility
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Fetch user data when component mounts

    const fetchUserData = async () => {
      if (storedUser) {
        try {
          const response = await axios.post(`/api/user/sendProfileImage`,{id:storedUser.id});
          if (response.data.success) {
            console.log('User data fetched successfully:' + response.data.user);
            setImage(response.data.user.image);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();


  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  // Handle image upload on form submission
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('id', storedUser.id);
      formData.append('image', file);

      // POST request to upload the image
      const response = await axios.post('/api/user/uploadImage', formData);
      if (response.data.success) {
        console.log('Image uploaded successfully');
        fetchUserData();
        
      
      } else {
        console.log('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  return (
    <div className="flex h-screen">
      {/* Left narrow navigation bar */}
      <div className="bg-gray-800 w-16 flex flex-col items-center py-4 text-gray-200">
        {/* Top: Profile icon (click toggles the sidebar) */}
        <div className="mb-8 cursor-pointer" onClick={toggleSidebar} title="Profile">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <IoSettingsOutline size={30} />
          )}
        </div>

        {/* Middle: Navigation icons */}
        <div className="flex flex-col space-y-6">
          <button title="Chats" className="hover:text-blue-500 focus:outline-none">
            <IoChatbubbleEllipsesOutline size={24} />
          </button>
          <button title="Calls" className="hover:text-blue-500 focus:outline-none">
            <IoCallOutline size={24} />
          </button>
          <button title="Contacts" className="hover:text-blue-500 focus:outline-none">
            <IoPeopleOutline size={24} />
          </button>
          <button
            title="Settings"
            className="hover:text-blue-500 focus:outline-none"
            onClick={toggleSidebar}
          >
            <IoSettingsOutline size={24} />
          </button>
        </div>
      </div>

      {/* Expanded sidebar menu overlay */}
      {isSidebarVisible && (
        <div className="fixed top-0 left-16 bg-gray-900 w-[340px] text-gray-200 h-screen p-4 flex flex-col justify-between z-50">
          {/* Close button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-gray-300 hover:text-white focus:outline-none"
            title="Close"
          >
            <IoCloseCircleOutline size={24} />
          </button>

          <div>
            <h1 className="text-2xl font-bold mb-4">Menu</h1>

            {/* User Info */}
            <div className="mb-6 border-b border-gray-700 pb-4">
              <p className="text-lg font-semibold">Username: {fullname}</p>
              <p className="text-sm text-gray-400">Email: {email}</p>
            </div>

            {/* Profile Picture and Upload Form */}
            <div className="mb-6 flex flex-col items-center">
              <p className="text-lg font-semibold mb-2">Profile Picture</p>
              <img
                src={image}
                alt="Profile"
                className="rounded-full h-24 w-24 object-cover mb-2"
              />
              <form onSubmit={handleUpload} className="flex flex-col items-center">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) =>setFile(e.target.files[0])}
                  className="mb-2"
                />
                <button 
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                >
                  Update Picture
                </button>
              </form>
            </div>

            {/* Additional Menu Options */}
            <div className="space-y-4">
              <button className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-md w-full focus:outline-none">
                <IoChatbubbleEllipsesOutline size={20} />
                <span>Chats</span>
              </button>
              <button className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-md w-full focus:outline-none">
                <IoCallOutline size={20} />
                <span>Calls</span>
              </button>
              <button className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-md w-full focus:outline-none">
                <IoPeopleOutline size={20} />
                <span>Contacts</span>
              </button>
              <button className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-md w-full focus:outline-none">
                <IoSettingsOutline size={20} />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Logout Button at the Bottom */}
          <div>
            <Logout />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
