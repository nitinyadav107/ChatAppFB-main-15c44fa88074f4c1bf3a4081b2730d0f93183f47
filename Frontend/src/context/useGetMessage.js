import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const receiver_id=(JSON.parse(localStorage.getItem('ChatApp'))).id
  console.log(receiver_id)
  //  console.log(selectedConversation._id)

  useEffect(() => {
    const getMessages = async () => {
     
       if (selectedConversation && selectedConversation._id) {
        setLoading(true);
        try {
          const res = await axios.get(
            `/api/message/get/${receiver_id}/${selectedConversation._id}`
          );
          
          setMessage(res.data.messages);
         
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false)
        }
      } else {
        setLoading(false);
      }
    };
    getMessages();
  }, [selectedConversation, setMessage,receiver_id]);
  return { loading, messages };
};

export default useGetMessage;