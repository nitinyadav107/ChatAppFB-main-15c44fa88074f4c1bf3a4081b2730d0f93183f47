import React from 'react';
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';

const User = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  const image = user.image
    ? user.image
    : `https://api.dicebear.com/6.x/avataaars/svg?seed=${user.fullname}`;

  return (
    <div
      className={`w-full ${isSelected ? 'bg-slate-700' : ''}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center gap-4 px-4 sm:px-6 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-10 sm:w-12 md:w-14 rounded-full overflow-hidden">
            <img className="rounded-full object-cover w-full h-full" src={image} alt={user.fullname} />
          </div>
          {isOnline && (
            <span className="absolute top-0 right-0 bg-green-500 border border-slate-800 w-3 h-3 rounded-full" />
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col overflow-hidden">
          <h1 className="text-white font-semibold text-sm sm:text-base md:text-lg truncate max-w-[180px] sm:max-w-[220px] md:max-w-[260px]">
            {user.fullname}
          </h1>
          <span className="text-gray-400 text-xs sm:text-sm break-words truncate max-w-[180px] sm:max-w-[220px] md:max-w-[260px]">
            {user.email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default User;
