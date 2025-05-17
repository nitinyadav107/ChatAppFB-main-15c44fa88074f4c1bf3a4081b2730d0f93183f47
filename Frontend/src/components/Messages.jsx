import React, { useEffect, useRef } from "react";
import useGetMessage from "../context/useGetMessage";
import Loading from "./Loading";
import Message from "./Message";
import useGetSocketMessage from "../context/useGetSocketMessage";



function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage();
  
  
  console.log(messages);

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);
  return (
    <div
      className="element-class overflow-y-scroll  h-[calc(92vh-15vh)] "
      style={{ minHeight: "calc(92vh - 56vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        Array.isArray(messages) &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      )}

     
    </div>
  );
}

export default Messages;
