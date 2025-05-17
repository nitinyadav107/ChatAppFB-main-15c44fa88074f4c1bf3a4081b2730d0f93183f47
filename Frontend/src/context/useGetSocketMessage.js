import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/notification.mp3";
const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage ,selectedConversation} = useConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      if (
        selectedConversation &&
        (newMessage.senderId === selectedConversation._id || 
         newMessage.receiverId === selectedConversation._id)
      ) {
        setMessage([...messages, newMessage]);
      }
      
      
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, setMessage, selectedConversation, messages]);
};
export default useGetSocketMessage;