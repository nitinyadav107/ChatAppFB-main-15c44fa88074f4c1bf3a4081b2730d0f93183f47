import React, { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation.js";
import { toast } from "react-toastify";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const sender_id = (JSON.parse(localStorage.getItem('ChatApp'))).id

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      if (selectedConversation._id === "67a75facf359349a42850e03") {
        console.log("hello");
        const handler = async () => {
          try {

            const data = await axios.post(
              `/api/message/send/${selectedConversation._id}`,
              { sender_id, message }
            );

          
            setMessage([...messages, data.data]);
            
           
          
            const res = await axios.post(`/api/ai/gemini`, { message });
            const newMessage = {
              message: res.data.reply,
            };

          
            const gemini = await axios.post(
              `/api/message/send/${sender_id}`,
              { sender_id: selectedConversation._id, message: newMessage.message }
            );
            

           
             setMessage([...messages,data.data,gemini.data]);

          } catch (error) {
            console.log("Error in handler:", error);
           
          } finally {
            setLoading(false);
          }
        };
        handler();

      }
      else {
        const res = await axios.post(
          `/api/message/send/${selectedConversation._id}`,
          { sender_id, message }
        );
        if(res.data.error){
          toast.error(res.data.error);
        }
        else{
          await setMessage([...messages, res.data]);
          console.log(res.data)
         
          setLoading(false);
          
        }

       

      }

    } catch (error) {
      console.log("Error in send messages", error);
     
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;
