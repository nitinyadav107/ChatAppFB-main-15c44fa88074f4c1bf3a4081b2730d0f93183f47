import { useSocketContext } from "../context/SocketContext.jsx";
import useConversation from "../zustand/useConversation.js"

const Chatuser = ({user}) => {
  const {selectedConversation}
  =useConversation()
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation._id);
  const image = selectedConversation.image?selectedConversation.image:`https://api.dicebear.com/6.x/avataaars/svg?seed=${selectedConversation.fullname}`
  return (
    <div className="" >
      <div className='flex space-x-4  px-6 py-3 bg-gray-900 duration-300 cursor-pointer '>
        <div className="avatar online rounded-full">
          <div className="w-12 rounded-full">
            <img className='rounded-full' src={image} />
          </div>
        </div>
        <div>
          <h1 className='font-semibold text-md'>{selectedConversation.fullname}</h1>
          <span >{isOnline?"Online":"Offline"}</span>
        </div>
      </div>
      
    </div>
  )
}

export default Chatuser
