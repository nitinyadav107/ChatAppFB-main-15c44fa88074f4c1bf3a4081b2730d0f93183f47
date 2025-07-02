import { useSocketContext } from "../context/SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";
import { BsTelephone, BsCameraVideo } from "react-icons/bs";

const Chatuser = () => {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(selectedConversation?._id);
  const image = selectedConversation?.image
    ? selectedConversation.image
    : `https://api.dicebear.com/6.x/avataaars/svg?seed=${selectedConversation?.fullname}`;

  return (
    <div className="w-full bg-gray-900 px-4 sm:px-6 py-3 ">
      <div className="flex items-center justify-between gap-4">
        {/* Left - User Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className={`avatar ${isOnline ? "online" : "offline"} shrink-0`}>
            <div className="w-10 sm:w-12 md:w-14 rounded-full overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={image}
                alt={selectedConversation?.fullname || "user"}
              />
            </div>
          </div>

          {/* Name + Status */}
          <div className="flex flex-col overflow-hidden">
            <h1 className="font-semibold text-sm sm:text-base md:text-lg text-white capitalize break-words truncate sm:whitespace-normal max-w-[180px] sm:max-w-[220px] md:max-w-full">
              {selectedConversation?.fullname}
            </h1>
            <span
              className={`text-xs sm:text-sm ${
                isOnline ? "text-green-400" : "text-gray-400"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Right - Call Icons */}
        <div className="flex items-center gap-3 sm:gap-4 text-white text-lg sm:text-2xl">
          <button
            title="Audio Call"
            className="hover:text-cyan-400 transition duration-200"
            onClick={() => alert("Audio call feature coming soon!")}
          >
            <BsTelephone />
          </button>
          <button
            title="Video Call"
            className="hover:text-cyan-400 transition duration-200"
            onClick={() => alert("Video call feature coming soon!")}
          >
            <BsCameraVideo />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatuser;
