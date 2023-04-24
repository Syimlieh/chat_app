import { InboxContext } from "@/context/inbox";
import { SocketContext } from "@/context/socketContext";
import { UserContext } from "@/context/userContext";
import React, { useContext, useState } from "react";

const MessageInput = () => {
  const [messageText, setMessageText] = useState("");
  const { socket, socketInitializer, socketConnected, setSocketConnected } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { receiverId } = useContext(InboxContext);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!socket.current && !socketConnected) {
      socketInitializer();
    }
    if(socketConnected) {
      console.log("sendMessage called", socket.current.id)
      socket.current.emit("sendMessage", {
        senderId: user.data._id,
        receiverId,
        messageText,
      });
      setMessageText("");
    }
  };

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
            disabled={!socketConnected}
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 transition duration-500 ease-in-out text-white bg-[#7169e2] hover:bg-[#5d53e5] focus:outline-none"
            // onClick={(e) => sendMessage(e, messageText, user, receiverId)}
            onClick={(e) => handleSendMessage(e)}
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
