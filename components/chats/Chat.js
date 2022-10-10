import Image from "next/image";
import React from "react";

const Chat = ({ userName, lastMessage }) => {
  return (
    <div className="relative ">
      <div className="relative flex items-center space-x-4 mb-4 rounded-md">
        <Image
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          alt="profile image"
          width={30}
          height={30}
          objectFit="cover"
          className="rounded-full"
        />
        <div className="flex flex-col leading-tight  w-full">
          <div className="text-lg mt-1 flex items-center">
            <span className="text-gray-700 mr-3">{userName}</span>
          </div>
          <span className="text-xs text-gray-600">{lastMessage}</span>
          <hr className="w-full mt-3" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
