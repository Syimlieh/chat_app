import { InboxContext } from "@/context/inbox";
import { SocketContext } from "@/context/socketContext";
import { UserContext } from "@/context/userContext";
import React, { useContext, useEffect, useState } from "react";

const MessageInput = () => {
  const [messageText, setMessageText] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { receiverId, setMessages } = useContext(InboxContext);

  const handleSendSocket = async (e) => {
    e.preventDefault();
    if (!socket.current) {
      await fetch("/api/conversation");
      socket.current = io();

      socket.current.on("connect", () => {
        setSocketConnected(true);
      });

      socket.current.on("disconnect", () => {
        setSocketConnected(false);
      });
    } else {
      setSocketConnected(true);
    }

    if(socket.current) {
      await fetch("/api/conversation");
      socket.current.emit("sendMessage", {
        senderId: user.data._id,
        receiverId,
        messageText,
      });
      setMessageText("");
    }
  };
  
  useEffect(() => {
  }, [socketConnected]);

  useEffect(() => {
    socket.current.on("messages", (data) => {
      setSocketConnected(false);
      setMessages(data);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="relative flex rounded-md">
        <form className="w-full">
          <input
            type="text"
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 transition duration-500 ease-in-out text-white bg-[#7169e2] hover:bg-[#5d53e5] focus:outline-none"
            // onClick={(e) => sendMessage(e, messageText, user, receiverId)}
            onClick={(e) => handleSendSocket(e)}
          >
            <span className="font-bold">Send</span>
          </button>
        </form>
      </div>
      <div className="hideMessageOverlay h-4 bg-[#272c39]  border-none"></div>
    </div>
  );
};

export default MessageInput;
