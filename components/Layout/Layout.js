import React from "react";
import Chats from "../chats/Chats";
import DisplayMessage from "../chats/DisplayMessage/DisplayMessage";
import SearchInput from "../chats/SearchInput";
import TopNavbar from "../nav/TopNavbar";

const Layout = () => {
  return (
    <div>
      <TopNavbar />
      <div className="flex">
        <div className="mx-16 w-[30%] ">
          <SearchInput />
          <Chats />
        </div>
        <div className="w-3/5">
          <DisplayMessage />
        </div>
      </div>
    </div>
  );
};

export default Layout;
