import Image from "next/image";
import React from "react";

const TopNavbar = () => {
  return (
    <div className="flex-1 justify-between flex flex-col h-25rem">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div>
          <p className="text-3xl ml-16 text-[#7a0a44] font-extrabold">
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
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-[#3498db] mr-3">Flemingstar Syiemlieh</span>
            </div>
            <span className="text-lg text-[#3498db]">Junior Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
