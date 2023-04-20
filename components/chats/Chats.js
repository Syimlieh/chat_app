import React, { useContext, useEffect } from "react";
import Chat from "./Chat";
import { InboxContext } from "@/context/inbox";
import { io } from "socket.io-client";
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
    receiverId,
  } = useContext(InboxContext);
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const handleMessage = async () => {
    return new Promise(async (resolve, reject) => {
      if (!socket.current) {
        console.log("create new socket for message")
        await fetch(`/api/message`);
        socket.current = io();

        socket.current.on("connect", () => {
          resolve(socket.current);
        });
        socket.current.emit("addUser", user?.data?._id);

        socket.current.on("disconnect", () => {
          console.log("disconnected");
        });
      } else {
        resolve(socket.current);
      }
      socket.current.on("messages", (data) => {
        console.log("socket messages ---->", data);
        setMessages(data);
      });
    });
  };
  const fetchMessage = async () => {
    await fetch(`/api/message`);
    if (socket.current) {
      socket.current.emit("fetchMessages", {
        inboxId,
        currentUser: user?.data?._id,
      });
      
      return () => {
        // Clean up the 'messages' event listener when the component unmounts
        socket.current.off("messages");
        socket.current.off("fetchMessages");
      };
    }
  };
  useEffect(() => {
    fetchMessage();
  }, [receiverId]);

  return (
    <div className="w-full rounded-xl h-[calc(100vh_-_14rem)] bg-[#272c39] p-8 py-6 mt-6 scroll-smooth scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-y-auto border-none">
      {conversations ? (
        conversations?.map((item, index) => (
          <div
            key={index}
            onClick={async () => {
              if (item.participants) {
                await handleMessage();
                await setInboxId(item?.inboxId?._id);
                await handleParticipants(item?.participants);
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
