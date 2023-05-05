import { createContext, useContext, useRef, useState, useEffect } from "react"
import { UserContext } from "./userContext";
import io from "socket.io-client";
import { InboxContext } from "./inbox";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const socket = useRef();
  const [socketConnected, setSocketConnected] = useState(false);
  const { setMessages, setConversations, conversations } = useContext(InboxContext);
  const { user } = useContext(UserContext);
  const socketInitializer = async () => {
    if (!socket.current) {
      await fetch("/api/socket");
      socket.current = io();
      socket.current.on("connect", () => {
        setSocketConnected(true);
      });
      socket.current.emit("addUser", user.data._id);
      socket.current.emit("fetchConvo", user.data._id);
      socket.current.on("inboxFetched", (data) => {
        setConversations(data?.data);
      });
      
      socket.current.on("messages", (data) => {
        setMessages(data);
      });
      socket.current.on("disconnect", () => {
        setSocketConnected(false);
      });
    }
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("fetchLastMessage", (data) => {
        // update the last message for the other participants in the group
        const updateConversation = (convo, updatedInbox) => {
          return convo.map(conversation => {
            if (conversation.inboxId._id === updatedInbox._id) {
              return {
                ...conversation,
                inboxId: updatedInbox
              };
            }
            return conversation;
          });
        }
        const updateConvo = updateConversation(conversations, data.data)
        setConversations(updateConvo);
      });
    }
  }, [conversations, socket]);
  return (
    <SocketContext.Provider value={{ socket, socketConnected, setSocketConnected, socketInitializer }}>
      {children}
    </SocketContext.Provider>
  )
}