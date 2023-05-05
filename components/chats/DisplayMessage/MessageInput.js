import { InboxContext } from "@/context/inbox";
import { SocketContext } from "@/context/socketContext";
import { UserContext } from "@/context/userContext";
import React, { useContext, useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiDizzyFill } from "react-icons/bs";

const MessageInput = () => {
  const [messageText, setMessageText] = useState("");
  const [emojiText, setEmojiText] = useState("");
  const [emojiModal, setEmojiModal] = useState(false);
  const { socket, socketInitializer, socketConnected, setSocketConnected } =
    useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { receiverId, chatType, groupId } = useContext(InboxContext);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!socket.current && !socketConnected) {
      socketInitializer();
    }
    if (socketConnected) {
      socket.current.emit("sendMessage", {
        senderId: user.data._id,
        receiverId,
        messageText,
        type: chatType,
        groupId,
      });
      setMessageText("");
    }
  };
  const handleEmojiClick = (data) => {
    console.log(data)
    let message = messageText;
    message += data.native;
    setMessageText(message);
  };
  const handleEmojiModal =() => {
    setEmojiModal(!emojiModal);
  }

  return (
    <div className="w-full">
      <div className="relative flex rounded-md">
        <form className="w-full">
          <span>
            <BsEmojiDizzyFill
              className="absolute text-xl text-gray-400 top-3 left-4 cursor-pointer"
              onClick={() => {
                handleEmojiModal()
              }}
            />
            {emojiModal && (
              <span className="border border-r-indigo-300 absolute bottom-[5.5rem]"
                
              >
                <Picker 
                data={data} 
                onEmojiSelect={handleEmojiClick} 
                emojiButtonSize={40} 
                emojiButtonColors={[
                  'rgba(155,223,88,.7)',
                  'rgba(149,211,254,.7)',
                  'rgba(247,233,34,.7)',
                  'rgba(238,166,252,.7)',
                  'rgba(255,213,143,.7)',
                  'rgba(211,209,255,.7)',
                ]}
                theme="light"
              />
              </span>
            )}

            <input
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
          </span>
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
