import React from "react";

function Message({ message }) {
  // console.log("Message component", message);
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  // console.log("Auth user", authUser);
  // console.log("Auth user id"
  // , authUser.id);
  // console.log("Message sender id", message.senderId);
  const itsMe1 = message.senderId === authUser.id
  // console.log("itsMe1", itsMe1);
  const itsMe2= message.newMessage? message.newMessage.senderId === authUser.id:false;
  // console.log("itsMe2", itsMe2);
  const itsMe=itsMe1 || itsMe2;
  // console.log("itsMe", itsMe);

  const chatName = itsMe ? " chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";
  const newTime= message.newMessage? new Date(message.newMessage.createdAt): null;
  const createdAt =newTime ? newTime : new Date(message.createdAt) 
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div>
      {message.newMessage ? (
        <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {message.newMessage.message}
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>

      ):(<div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {message.message}
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>)} 
      
    </div>
  );
}

export default Message;