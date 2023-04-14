import React, { useContext, useEffect } from "react";
import { InboxContext } from "@/context/inbox";
import { useQuery } from "@tanstack/react-query";
import { getInbox } from "../chats/api";
import Chats from "../chats/Chats";
import DisplayMessage from "../chats/DisplayMessage/DisplayMessage";
import MessageInput from "../chats/DisplayMessage/MessageInput";
import SearchInput from "../chats/SearchInput";
import TopNavbar from "../nav/TopNavbar";

const Layout = ({ session, socket }) => {
  return (
    <div>
      <TopNavbar />
      <div className="flex">
        <div className="mx-16 w-[30%] ">
          <SearchInput />
          <Chats socket={socket} session={session.session} />
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
