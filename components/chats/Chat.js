import { InboxContext } from "@/context/inbox";
import Image from "next/image";
import React, { useContext } from "react";
import TypingIndicator from "../Loader/TypingIndicator";

const Chat = ({ userName, lastMessage, typing }) => {
  const {
    isTypingInbox,
    isTyping,
  } = useContext(InboxContext);
  
  return (
    <div className="relative ">
      <div className="relative flex items-center space-x-4 mb-4 rounded-md">
        <Image
          src="/uploads/profile/fernandhood1.jpg"
          width={30}
          height={30}
          className="w-6 h-6 rounded-full order-2"
          alt="Profile"
          objectFit="cover"
        />
        <div className="flex flex-col leading-tight  w-full">
          <div className="text-lg mt-1 flex items-center">
            <span className="text-[#a9a2ef] mr-3 cursor-pointer font-semibold tracking-wider">
              {userName}
            </span>
          </div>
          <span className="text-xs text-gray-400 h-4">{isTyping && isTypingInbox === typing ? <TypingIndicator /> : lastMessage}</span>
          <hr className="w-full mt-3 border-t border-[#bccdf6]" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
