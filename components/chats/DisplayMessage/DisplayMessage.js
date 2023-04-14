import { InboxContext } from "@/context/inbox";
import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
// import { getMessages } from "./api";
// import MessageInput from "./MessageInput";

const DisplayMessage = ({ session, socket }) => {
  const { inboxId, setMessages, messages } = useContext(InboxContext);
  const srollRef = useRef();

  return (
    <div className=" relative px-4 w-full rounded-xl h-[calc(100vh_-_15rem)] bg-[#272c39] mt-8 scroll-smooth scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-y-auto border-none">
      <div
        id="messages"
        className="flex flex-col p-8 space-y-4  scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        ref={srollRef}
      >
        {messages.data &&
          messages?.data.map((item, index) => {
            return item.senderId.email === session.user.email ? (
              <div className="chat-message" key={index}>
                <div className="flex items-end justify-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                    <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-[#a9a2ef] border-1 border-[#b2f7fd] text-gray-800 ">
                        {item.messageText}
                      </span>
                    </div>
                  </div>

                  <Image
                    src="/uploads/profile/fernandhood1.jpg"
                    width={30}
                    height={30}
                    className="w-6 h-6 rounded-full order-2"
                    alt="Profile"
                    objectFit="cover"
                  />
                </div>
              </div>
            ) : (
              <div className="chat-message" key={index}>
                <div className="flex items-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#bccdf6] text-gray-700">
                        {item.messageText}
                      </span>
                    </div>
                  </div>
                  <Image
                    src="/uploads/profile/fernandhood1.jpg"
                    width={30}
                    height={30}
                    className="w-6 h-6 rounded-full order-2"
                    alt="Profile"
                    objectFit="cover"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DisplayMessage;
