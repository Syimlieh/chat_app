import React from "react";
import Chat from "./Chat";
import SearchInput from "./SearchInput";

const Chats = () => {
  return (
    <div className="w-full rounded-xl h-[calc(100vh_-_12rem)] bg-[#272c39] p-8 py-6 mt-6 scroll-smooth scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-y-auto border-none">
      <Chat userName="Flemingstar Syiemlieh" lastMessage="Goodbye" />
      <Chat userName="MD Rashid" lastMessage="Goodbye" />
      <Chat userName="Bapanz Dvarma" lastMessage="Goodbye" />
      <Chat userName="Flemingstar Syiemlieh" lastMessage="Goodbye" />
      <Chat userName="Bibek Regmi" lastMessage="Goodbye" />
      <Chat userName="Rapborlang" lastMessage="Goodbye" />
      <Chat userName="Job Group " lastMessage="Finish before deadline" />
      <Chat userName="CSE Group 7sem" lastMessage="Exam Notice " />
      <Chat userName="CSE Group 7sem" lastMessage="Exam Notice " />
    </div>
  );
};

export default Chats;
