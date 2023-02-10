import { InboxContext } from "@/context/inbox";
import { UserContext } from "@/context/userContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { getMessages, sendingMessage } from "./api";
import io from "socket.io-client";

let socket;

const MessageInput = () => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  // const [socket, setSocket] = useState(null);
  const { user } = useContext(UserContext);
  const { receiverId, inboxId, setInboxId } = useContext(InboxContext);
  // const queryClient = useQueryClient();
  // const { mutate } = useMutation(sendingMessage, {
  //   onSuccess: (data) => {
  //     setInboxId(data?.data?._id);
  //     queryClient.invalidateQueries({ queryKey: ["inbox"] });
  //     queryClient.invalidateQueries({ queryKey: ["message"] });
  //     setMessageText("");
  //   },
  //   onError: () => {
  //     alert("there was an error");
  //   },
  // });

  // fetching message/
  useQuery(
    ["message", inboxId],
    async () => {
      return await getMessages(inboxId);
    },
    {
      onSuccess: (data) => {
        console.log("fetched messages REST", data);
        setMessages(data);
      },
      onError: () => {
        alert("there was an error");
      },
    },
    {
      enabled: !!inboxId,
    }
  );

  const socketInitializer = async () => {
    await fetch("/api/conversation");

    socket = io();
    socket.on("error", (error) => {
      console.error("socket error", error);
    });
    socket.on("messages", (msg) => {
      console.log("socket msg", msg);
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      senderId: user.data._id,
      receiverId,
      messageText,
    });
  };
  useEffect(() => {
    socketInitializer();
  }, []);

  // useEffect(() => {
  //   // const newSocket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/conversation`);
  //   setSocket(newSocket);
  //   console.log(newSocket);
  //   console.log(socket);
  //   newSocket.on("connect", () => {
  //     console.log("Connected to the server");
  //   });

  //   newSocket.on("error", (error) => {
  //     console.error("socket error", error);
  //   });

  //   newSocket.on("messageSent", (data) => {
  //     console.log("message sent", data);
  //   });

  //   return () => {
  //     newSocket.close();
  //   };
  // }, []);

  // const onChangeHandler = (e) => {
  //   console.log("reach Here");
  //   socket.emit("sendMessage", {
  //     senderId: user,
  //     receiverId,
  //     messageText,
  //   });
  // };

  const onSubmit = (e, messageText, user, receiverId) => {
    e.preventDefault();
    mutate({ messageText, user, receiverId });
  };

  return (
    <div className="w-full">
      <div className="relative flex rounded-md">
        <form className="w-full">
          <input
            type="text"
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 transition duration-500 ease-in-out text-white bg-[#7169e2] hover:bg-[#5d53e5] focus:outline-none"
            // onClick={(e) => onChangeHandler(e, messageText, user, receiverId)}
            onClick={(e) => sendMessage(e)}
          >
            <span className="font-bold">Send</span>
          </button>
        </form>
        {/* <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-[inherit] h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div> */}
      </div>
      <div className="hideMessageOverlay h-4 bg-[#272c39]  border-none"></div>
    </div>
  );
};

export default MessageInput;
