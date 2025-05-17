import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:8000", {
        query: {
          userId: authUser.id,
        },
      });
      setSocket(newSocket);
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => newSocket.close();
    } else if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
