import { InboxContext } from "@/context/inbox";
import { UserContext } from "@/context/userContext";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { searchUsername } from "./api";

const SearchInput = () => {
  const { setNewUser, newUser } = useContext(UserContext);
  const { setConversations, conversations } = useContext(InboxContext);
  const [searchUser, setSearchUser] = useState("");
  const [exist, setExist] = useState(true);
  const { data, refetch, error } = useQuery(
    ["newUser", searchUser],
    async () => {
      return await searchUsername(searchUser);
    },
    {
      enabled: false,
      onSuccess: (data) => {
        if (conversations?.length > 0) {
          if (
            !conversations.some(
              (obj) =>
                obj.other?.userName === data.data?.userName ||
                obj?.userName === data.data?.userName
            )
          ) {
            setConversations((oldArray) => [...oldArray, data?.data]);
          }
        } else {
          setConversations([data.data]);
        }
      },
    }
  );

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="w-full rounded-3xl bg-[#272c39] mt-8 border-none">
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-[#3498db] dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block px-8 py-[.8rem]  pl-10 w-full text-sm  rounded-3xl dark:placeholder-gray-400 "
            placeholder="Search Chats"
            required
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <button
            type="submit"
            className="bg-transparent border-2 font-semibold border-none text-[#a9a2ef] absolute right-0 bottom-[0px] rounded-3xl text-lg px-8 py-[.57rem]"
            onClick={(e) => {
              e.preventDefault();
              refetch();
            }}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
