import React, { useContext, useEffect, useRef } from "react";
import Chat from "./Chat";
import { InboxContext } from "@/context/inbox";
import { UserContext } from "@/context/userContext";
import { SocketContext } from "@/context/socketContext";
import NewGroup from "../modal/NewGroup";

const Chats = () => {
  const {
    setInboxId,
    handleParticipants,
    setReceiverId,
    conversations,
    setMessages,
    groupModal,
    setChatType,
    setGroupId,
    setSelectedChat,
    selectedChat,
  } = useContext(InboxContext);

  const { socket, socketInitializer, socketConnected } = useContext(SocketContext);
  //  to make sure the useEffect is ran only once.
  const effectRan = useRef(false);
  useEffect(() => {
    if (!socket.current && !socketConnected && !effectRan.current) {
      socketInitializer();
    }
    return () => {
      effectRan.current = true;
    }
  }, []);
  return (
    <div className="w-full rounded-xl h-[calc(100vh_-_14rem)] bg-[#272c39] p-8 py-6 mt-6 scroll-smooth scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-y-auto border-none">
      {conversations ? (
        conversations?.map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              if (item.participants) {
                setSelectedChat(item.inboxId);
                setGroupId('');
                setInboxId(item?.inboxId?._id);
                handleParticipants(item?.participants);
                setChatType(item.type);
                item.groups.length ? setGroupId(item.groups[0]._id) : null
              } else {
                setMessages("");
                setReceiverId(item._id);
              }
            }}
          >
            <Chat
              inboxId={item?._id}
              userName={!item.groups.length ? item?.other[0].userName : item.groups[0].groupName || item?.userName}
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
      {
        groupModal && <NewGroup />
      }
    </div>
  );
};

export default Chats;
