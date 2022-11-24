import Image from "next/image";
import React, { useState } from "react";
import { FcExpand } from "react-icons/fc";
import ProfileModal from "./modal/ProfileModal";

const TopNavbar = () => {
  const [hide, setHide] = useState(false);
  return (
    <div className="flex-1 justify-between flex flex-col h-25rem">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 relative">
        <div>
          <p className="text-3xl ml-16 text-[#bccdf6] font-extrabold">
            sYiEmChAt
          </p>
        </div>
        <div className="relative flex items-center space-x-4">
          <Image
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="profile image"
            width={60}
            height={60}
            className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
          />
          <div className="flex flex-col leading-tight mr-1">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-[#bccdf6] mr-3">Flemingstar Syiemlieh</span>
            </div>
            <span className="text-lg text-[#bccdf6]">Junior Developer</span>
          </div>
          <FcExpand
            className="cursor-pointer h-8 w-6"
            style={{ marginLeft: "10px !important" }}
            onClick={() => setHide(!hide)}
          />
        </div>
        {hide && (
          <>
            <div
              className="w-screen h-screen overflow-hidden absolute top-0 right-0 bg-transparent z-10"
              onClick={() => setHide(!hide)}
            ></div>
            <div className="absolute top-full right-1 z-20">
              <ProfileModal />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
