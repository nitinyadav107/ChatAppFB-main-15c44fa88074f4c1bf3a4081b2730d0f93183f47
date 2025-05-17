import React, { useState } from 'react'
import useSendMessage from '../context/useSendMessage';
import { IoSend } from "react-icons/io5";



const Typesend = () => {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");
  console.log(message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <div className='px-6 py-4 fixed bottom-0 w-[70%] bg-gray-900'>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-2'>
          <label className="border-[0px] rounded-lg flex items-center gap-2 w-[80%] bg-slate-900">
            <input
              type="text"
              className="outline-none border-none px-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send Messages"
            />
          </label>
          <button type='submit'>
            <IoSend className='text-4xl p-2 hover:bg-gray-800 rounded-full duration-300' />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Typesend
