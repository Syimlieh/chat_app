import React, { useContext } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { signOut } from "next-auth/react";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import { InboxContext } from "@/context/inbox";
// import {signOut} from "next"

const ProfileModal = () => {
  const {
    setGroupModal,
    groupModal,
  } = useContext(InboxContext);
  return (
    <div className="w-64 h-max border border-red-200 rounded-lg p-8 shadow-lg bg-white">
      <div>
        <ul className="flex flex-col gap-4">
          <Link href="/user/profile">
            <li className="flex gap-4 items-center font-semibold text-xl font-sans cursor-pointer">
              <CgProfile className="h-8 w-6  text-[#a9a2ef]" /> Profile
            </li>
          </Link>
          <hr />
          <li className="flex gap-4 items-center font-semibold text-xl font-sans cursor-pointer">
            <FiSettings className="h-8 w-6  text-[#a9a2ef]" />
            Setting
          </li>
          <hr />
          <li className="flex gap-4 items-center font-semibold text-xl font-sans cursor-pointer" onClick={() => setGroupModal(!groupModal)}>
            <FiSettings className="h-8 w-6  text-[#a9a2ef]" />
            New Group
          </li>
          <hr />
          <li
            className="flex gap-4 items-center font-semibold text-xl font-sans cursor-pointer"
            onClick={() => signOut()}
          >
            <IoLogOutOutline className="h-8 w-6  text-[#a9a2ef]" />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileModal;
