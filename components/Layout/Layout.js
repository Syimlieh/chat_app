import React, { useContext, useEffect } from "react";
import { InboxContext } from "@/context/inbox";
import { useQuery } from "@tanstack/react-query";
import { getInbox } from "../chats/api";
import Chats from "../chats/Chats";
import DisplayMessage from "../chats/DisplayMessage/DisplayMessage";
import MessageInput from "../chats/DisplayMessage/MessageInput";
import SearchInput from "../chats/SearchInput";
import TopNavbar from "../nav/TopNavbar";
import io from "socket.io-client";

const Layout = ({ session, socket }) => {
  const { setConversations } = useContext(InboxContext);
  const { data, isLoading, error } = useQuery(
    ["inbox", session.session.user.email],
    async () => {
      return await getInbox(session.session.user.email);
    },
    {
      onSuccess: (data) => {
        // setConversations(data?.conversations);
      },
      onError: () => {
        alert("there was an error");
      },
    }
  );
  // if (error) return <div>Error: {error.message}</div>;
  // if (isLoading) return <div>Loading...</div>;
  
  
  return (
    <div>
      <TopNavbar />
      <div className="flex">
        <div className="mx-16 w-[30%] ">
          <SearchInput />
          <Chats />
        </div>
        <div className="flex flex-col w-3/5">
          <DisplayMessage session={session.session} socket={socket} />
          <MessageInput socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
