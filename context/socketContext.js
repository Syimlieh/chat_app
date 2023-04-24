import { createContext, useContext, useRef, useState } from "react"
import { UserContext } from "./userContext";
import io from "socket.io-client";
import { InboxContext } from "./inbox";

export const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {
    const socket = useRef();
    const [socketConnected, setSocketConnected] = useState(false);
    const { setMessages, setConversations } = useContext(InboxContext);
    const { user } = useContext(UserContext);
      const socketInitializer = async () => {
        if (!socket.current) {
          await fetch("/api/socket");
          socket.current = io();
          socket.current.on("connect", () => {
            console.log("connection establishedss")
            setSocketConnected(true);
          });
          socket.current.emit("addUser", user.data._id);
          socket.current.emit("fetchConvo", user.data._id);
          socket.current.on("inboxFetched", (data) => {
            setConversations(data?.data);
          });
          socket.current.on("messages", (data) => {
            console.log("socket.current messages ---->", data);
            setMessages(data);
          });
          socket.current.on("disconnect", () => {
            setSocketConnected(false);
          });
        }
      };
    return (
        <SocketContext.Provider value={{ socket, socketConnected, setSocketConnected, socketInitializer }}>
            {children}
        </SocketContext.Provider>
    )
}