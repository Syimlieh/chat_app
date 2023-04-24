import React, { useContext, useEffect, useRef } from "react";
import Chat from "./Chat";
import { InboxContext } from "@/context/inbox";
import { UserContext } from "@/context/userContext";
import { SocketContext } from "@/context/socketContext";

const Chats = () => {
  const {
    setInboxId,
    inboxId,
    handleParticipants,
    setReceiverId,
    conversations,
    setMessages,
  } = useContext(InboxContext);
  const { user } = useContext(UserContext);
  const { socket, socketInitializer, socketConnected } = useContext(SocketContext);
  //  to make sure the useEffect is ran only once.
  const effectRan = useRef(false)
  const fetchMessage = () => {
    if (socket.current && inboxId) {
      console.log("shoud fetch inside", socket);
      socket.current.emit("fetchMessages", {
        inboxId,
        currentUser: user?.data?._id,
      });
    }
  };

  useEffect(() => {
    if (!socket.current && !socketConnected && !effectRan.current) {
      socketInitializer();
    }
    return () => {
      effectRan.current = true;
    }
  }, []);
  useEffect(() => {
    if (inboxId && socket.current) {
      fetchMessage();
    }
  }, [inboxId]);

  return (
    <div className="w-full rounded-xl h-[calc(100vh_-_14rem)] bg-[#272c39] p-8 py-6 mt-6 scroll-smooth scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-y-auto border-none">
      {conversations ? (
        conversations?.map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              if (item.participants) {
                setInboxId(item?.inboxId?._id);
                handleParticipants(item?.participants);
                // fetchMessage();
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
