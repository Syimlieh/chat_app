import React from "react";
import MessageInput from "./MessageInput";

const DisplayMessage = () => {
  return (
    <div className="relative px-4 w-full rounded-xl h-[calc(100vh_-_10rem)] bg-[#272c39] mt-8 scroll-smooth scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-y-auto border-none">
      <div
        id="messages"
        className="flex flex-col p-8 space-y-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        <div className="chat-message">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#bccdf6] text-gray-700">
                  Can be verified on any platform using docker
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
        </div>
        <div className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-[#a9a2ef] border-1 border-[#b2f7fd] text-gray-800 ">
                  Your error message says permission denied, npm global installs
                  must be given root privileges.
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          </div>
        </div>
        <div className="chat-message">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block bg-[#bccdf6] text-gray-700">
                  Command was run with root privileges. Im sure about that.
                </span>
              </div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block bg-[#bccdf6] text-gray-700">
                  Ive update the description so its more obviously now
                </span>
              </div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block bg-[#bccdf6] text-gray-700">
                  FYI https://askubuntu.com/a/700266/510172
                </span>
              </div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#bccdf6] text-gray-700">
                  Check the line above (it ends with a # so, Im running it as
                  root )<pre># npm install -g @vue/devtools</pre>
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
        </div>
        <div className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-[#a9a2ef] text-gray-800 ">
                  Any updates on this issue? Im getting the same error when
                  trying to install devtools. Thanks
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          </div>
        </div>
        <div className="chat-message">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#bccdf6] text-gray-700">
                  Thanks for your message David. I thought Im alone with this
                  issue. Please, ? the issue to support it :
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
        </div>
        <div className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block bg-[#a9a2ef] text-gray-800 ">
                  Are you using sudo?
                </span>
              </div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-[#a9a2ef] text-gray-800 ">
                  Run this command sudo chown -R `whoami` /Users/
                  {/* {{ your_user_profile }}/.npm-global/ then install the */}
                  package globally without using sudo
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          </div>
        </div>
        <div className="chat-message">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block bg-[#bccdf6] text-gray-700">
                  It seems like you are from Mac OS world. There is no /Users/
                  folder on linux ?
                </span>
              </div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#bccdf6] text-gray-700">
                  I have no issue with any other packages installed with root
                  permission globally.
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
        </div>
        <div className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-[#a9a2ef] text-gray-800 ">
                  yes, I have a mac. I never had issues with root permission as
                  well, but this helped me to solve the problem
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          </div>
        </div>
        <div className="chat-message">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block bg-[#bccdf6] text-gray-700">
                  I get the same error on Arch Linux (also with sudo)
                </span>
              </div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block bg-[#bccdf6] text-gray-700">
                  I also have this issue, Here is what I was doing until now:
                  #1076
                </span>
              </div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#bccdf6] text-gray-700">
                  even i am facing
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
        </div>
      </div>
      <MessageInput />
    </div>
  );
};

export default DisplayMessage;
