import React, { useEffect } from 'react';
import Chatuser from '../components/Chatuser';
import Messages from '../components/Messages';
import Typesend from '../components/Typesend';
import useConversation from '../zustand/useConversation';
import { CiMenuFries } from 'react-icons/ci';

const Right = () => {
  const {
    selectedConversation,
    setSelectedConversation,
    showChat,
    setShowChat,
  } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div
      className={`w-full lg:w-[70%] h-screen flex flex-col bg-slate-900 text-gray-300 ${
        showChat ? 'block' : 'hidden'
      } lg:block`}
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="w-full border-b border-gray-700">
            <div className="flex items-center justify-between px-4 py-2">
              {/* Back Button on mobile */}
              <button
                onClick={() => setShowChat(false)}
                className="lg:hidden text-white text-xl"
              >
                <CiMenuFries />
              </button>
              <Chatuser />
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-2 sm:px-4"
            style={{ maxHeight: 'calc(100vh - 8rem)' }}
          >
            <Messages />
          </div>

          {/* Input */}
          <div className="w-full border-t border-gray-700">
            <Typesend />
          </div>
        </>
      )}
    </div>
  );
};

export default Right;

const NoChatSelected = () => {
  const authUser = JSON.parse(localStorage.getItem('ChatApp'));
  const { setShowChat } = useConversation();

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-4">
      {/* Back button on mobile */}
      <label
        onClick={() => setShowChat(false)}
        className="btn btn-ghost lg:hidden absolute top-4 left-4 cursor-pointer"
      >
        <CiMenuFries className="text-white text-2xl" />
      </label>

      <h1 className="text-lg sm:text-xl md:text-2xl font-medium text-white leading-relaxed">
        Welcome{' '}
        <span className="font-semibold text-cyan-400">{authUser?.fullname}</span>
        <br />
        <span className="text-sm sm:text-base">
          No chat selected. Please start a conversation by selecting someone
          from your contacts.
        </span>
      </h1>
    </div>
  );
};
