import React, { useState } from 'react';
import useSendMessage from '../context/useSendMessage';
import { IoSend } from 'react-icons/io5';

const Typesend = () => {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessages(message.trim());
    setMessage("");
  };

  return (
    <div className="w-full bg-gray-900 px-4 py-3 ">
      <form onSubmit={handleSubmit} className="w-full max-w-screen-lg mx-auto">
        <div className="flex items-center gap-2">
          {/* Input Box */}
          <div className="flex-1">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-full bg-slate-800 text-white placeholder-gray-400 border-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              aria-label="Message input"
              disabled={loading}
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-full transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
            disabled={loading}
          >
            <IoSend className="text-xl sm:text-2xl" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Typesend;
