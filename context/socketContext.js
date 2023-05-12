import { createContext, useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "./userContext";
import io from "socket.io-client";
import { InboxContext } from "./inbox";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const socket = useRef();
  const [socketConnected, setSocketConnected] = useState(false);
  const {
    setMessages,
    setConversations,
    conversations,
    setNotification,
    notification,
    selectedChat,
    setIsTyping,
    setIsTypingInbox
  } = useContext(InboxContext);
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
      socket.current.on('typing', (room) => {
        setIsTyping(true)
        setIsTypingInbox(room)
      })
      socket.current.on('stopTyping', () => {
        setIsTyping(false)
      })
      socket.current.on("inboxFetched", (data) => {
        setConversations(data?.data);
      });
      socket.current.on("disconnect", () => {
        setSocketConnected(false);
      });
    }
  };

  useEffect(() => {
    
    const messageHandler = (data) => {
      const inboxId = data?.data[0]?.inboxId;
      if (inboxId === selectedChat?._id) {
        setMessages(data);
      } else {
        // First, find the notification object for the corresponding inbox
        const existingNotification = notification.find(
          (notif) => notif.notificationChat?._id === inboxId
        );
        // If the notification already exists, update its count
        if (existingNotification) {
          setNotification((prev) =>
            prev.map((notif) => {
              if (notif.notificationChat?._id === inboxId) {
                return {
                  ...notif,
                  notificationCount: notif.notificationCount + 1
                };
              }
              return notif;
            })
          );
        } else {
          // If the notification doesn't exist, add a new one
          const newNotification = {
            notificationCount: 1,
            notificationChat: { _id: inboxId }
          };
          setNotification((prev) => [...prev, newNotification]);
        }
      }
    };

    if (socket.current) {
      socket.current.on("messages", messageHandler);

      // Clean up the listener when the component unmounts
      return () => {
        socket.current.off("messages", messageHandler);
      };
    }
  }, [selectedChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("fetchLastMessage", (data) => {
        // update the last message for the other participants in the group
        const updateConversation = (convo, updatedInbox) => {
          return convo.map((conversation) => {
            if (conversation.inboxId._id === updatedInbox._id) {
              return {
                ...conversation,
                inboxId: updatedInbox,
              };
            }
            return conversation;
          });
        };
        const updateConvo = updateConversation(conversations, data.data);
        setConversations(updateConvo);
      });
    }
  }, [conversations, socket]);
  return (
    <SocketContext.Provider
      value={{ socket, socketConnected, setSocketConnected, socketInitializer }}
    >
      {children}
    </SocketContext.Provider>
  );
};
