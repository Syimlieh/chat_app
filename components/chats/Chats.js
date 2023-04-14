import React, { useState, useContext } from "react";
import Chat from "./Chat";
import { InboxContext } from "@/context/inbox";

const Chats = ({socket, session}) => {
  const {
    inboxId,
    setInboxId,
    handleParticipants,
    setReceiverId,
    conversations,
    setMessages,
  } = useContext(InboxContext);

  const fetchMessage = async (inbox) => {
    await fetch(`/api/conversation/${session.user.email}`);
    socket.emit("fetchMessages", inbox);
    console.log("first chats", inbox)
    // Call the fetch function after emitting the event
    socket.on("messages", (data) => {
      console.log("socket messages ---->", data);
      setMessages(data);
    });
    return () => {
      // Clean up the 'messages' event listener when the component unmounts
      socket.off("fetchMessages");
    };
  };

  return (
    <div className="w-full rounded-xl h-[calc(100vh_-_14rem)] bg-[#272c39] p-8 py-6 mt-6 scroll-smooth scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-y-auto border-none">
      {conversations ? (
        conversations?.map((item, index) => (
          <div
            key={index}
            onClick={async () => {
              if (item.participants) {
                setInboxId(item?.inboxId?._id);
                handleParticipants(item?.participants);
                fetchMessage(item?.inboxId?._id);
              } else {
                setMessages("");
                setReceiverId(item._id);
              }
            }}
          >
            <Chat
              inboxId={item?._id}
              userName={item?.other?.userName || item?.userName}
              lastMessage={item?.inboxId?.lastMessage}
            />
          </div>
        ))
      ) : (
        <>
          <div>
            <p className="text-white">No Conversation Yet</p>
            <button className="mt-8 cursor-pointer py-4 px-8 [border:none] rounded-[8px] w-full bg-indigo-200  text-white font-outfit text-center flex box-border items-center justify-center text-lg">
              Invite People
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chats;
