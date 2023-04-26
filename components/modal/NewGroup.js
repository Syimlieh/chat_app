import { InboxContext } from "@/context/inbox";
import React, { useState, useContext } from "react";
import SearchInput from "../chats/SearchInput";

const NewGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupParticipants, setGroupParticipants] = useState("");
  const { conversations, setGroupModal, groupModal } = useContext(InboxContext);
  const handleGroupParticipants = (e) => {
    setGroupParticipants((prev) => {
        [...prev, e.target.value]
    });
  }
  return (
    <div>
        <>
          <div className="w-screen h-screen z-10 bg-gray-200 opacity-40 absolute top-0 left-0" 
            onClick={() => setGroupModal(!groupModal)}
          ></div>
            <div className="w-auto my-6 mx-auto max-w-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
             
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[24rem] bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between px-8 pb-8 rounded-t">
                  <SearchInput />
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto m-8">
                    <form className="flex flex-col">
                        <span className="flex flex-col gap-4 w-full">
                            <label className="text-2xl font-outfit" htmlFor="groupName">Group Name</label>
                            <input
                                id="groupName"
                                type="text"
                                name="groupName"
                                value={groupName}
                                onChange={() => {
                                    setGroupName(e.target.value);
                                }}
                                className="p-3 rounded-md outline-none border-none"
                                placeholder="Enter group name"
                            />
                        </span>
                        <span className="mt-8 flex flex-col gap-4 w-full">
                            <label className="text-2xl font-outfit">Participants</label>
                            <select
                                value={groupParticipants}
                                placeholder="Select Participant"
                                onChange={(e) => handleGroupParticipants(e)}
                                className="p-3 rounded-md outline-none border-none"
                            >   
                                <option>Select Participants</option>
                                {conversations && conversations.map((item) => {
                                  return (
                                    <option key={item.other._id}>{item.other.userName}</option>
                                  )
                                })}
                            </select>
                        </span>
                        <button
                          className="p-2 border-none outline-none bg-indigo-200 mt-8 rounded-md cursor-pointer text-lg" 
                          onClick={() => {

                          }}
                        >Create</button>
                    </form>
                </div>
              </div>
            </div>
        </>
    </div>
  );
};

export default NewGroup;
