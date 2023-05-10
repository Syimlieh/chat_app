import Image from "next/image";
import React, { useState, useContext } from "react";
import { FcExpand } from "react-icons/fc";
import { IoIosNotifications } from "react-icons/io";
import ProfileModal from "./modal/ProfileModal";
import { InboxContext } from "@/context/inbox";

const TopNavbar = () => {
  const [hide, setHide] = useState(false);
  const { notification } = useContext(InboxContext);
  const totalNotificationCount = notification.reduce(
    (acc, notif) => acc + notif.notificationCount,
    0
  );
  return (
    <div className="flex-1 justify-between flex flex-col h-25rem">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 relative">
        <div>
          <p className="text-3xl ml-16 text-[#bccdf6] font-extrabold">
            sYiEmChAt
          </p>
        </div>
        <div className="flex gap-8 items-center">
          <div className="relative cursor-pointer">
            <span
              className="absolute right-0 text-white flex font-mono justify-center items-center bg-indigo-200 rounded-full w-4 h-4 text-sm"
            >
              {totalNotificationCount}
            </span>
            <IoIosNotifications className="text-3xl text-white" />
          </div>
          <div className="relative flex items-center space-x-4">
            <Image
              src="/uploads/profile/fernandhood1.jpg"
              width={30}
              height={30}
              className="w-6 h-6 rounded-full order-2"
              alt="Profile"
              objectFit="cover"
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
