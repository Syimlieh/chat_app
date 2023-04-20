import React from "react";
import Chats from "../chats/Chats";
import DisplayMessage from "../chats/DisplayMessage/DisplayMessage";
import MessageInput from "../chats/DisplayMessage/MessageInput";
import SearchInput from "../chats/SearchInput";
import TopNavbar from "../nav/TopNavbar";

const Layout = ({ session }) => {
  return (
    <div>
      <TopNavbar />
      <div className="flex">
        <div className="mx-16 w-[30%] ">
          <SearchInput />
          <Chats />
        </div>
        <div className="flex flex-col w-3/5">
          <DisplayMessage session={session.session} />
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default Layout;
