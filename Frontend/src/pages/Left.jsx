import React from 'react';
import Search from '../components/Search';
import Users from '../components/Users';
import useConversation from '../zustand/useConversation';

const Left = () => {
  const { showChat } = useConversation();

  return (
    <div
      className={`w-full lg:w-[30%] bg-gray-900 text-gray-200 ${
        showChat ? 'hidden' : 'block'
      } lg:block`}
    >
      {/* <Search /> */}
      <Users />
    </div>
  );
};

export default Left;
